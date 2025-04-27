import express from 'express';
import cors from 'cors'; 
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import { body, validationResult } from 'express-validator';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
dotenv.config();

import {
  searchGoogleBooks,
  generateUser,
  generateMessages,
  generateConversation,
  injectBookModel,
  User
} from './Data.js';

import mongoosePkg from 'mongoose';
const { Schema } = mongoosePkg;

// Define schemas
const wishlistBookSchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Referense a user
  title: String,
  author: String,
  publisher: String,
  year: String,
  cover: String,
  isbn: String,
  genre: String,
  desc: String
});

const offeredBookSchema = new Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: String,
  author: String,
  publisher: String,
  year: String,
  cover: String,
  isbn: String,
  genre: String,
  desc: String,
  createdAt: { type: Date, default: Date.now }
});

const conversationSchema = new Schema({
  users: [Schema.ObjectId]
})

const messageSchema = new Schema({
  user: Schema.ObjectId,
  conversation: conversationSchema,
  createdAt: { type: Date },
  content: String
})

// Connect to main cluster, two DBs within same cluster
const wishlistConn = mongoose.createConnection(process.env.MONGODB_URI + '/wishlist', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const offeredConn = mongoose.createConnection(process.env.MONGODB_URI + '/offered', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const messageConn = mongoose.createConnection(process.env.MONGODB_URI + '/message', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const conversationConn = mongoose.createConnection(process.env.MONGODB_URI + '/conversations', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const WishlistBook = wishlistConn.model('WishlistBook', wishlistBookSchema);
const OfferedBook = offeredConn.model('OfferedBook', offeredBookSchema);
const Message = messageConn.model('Message', messageSchema)
const Conversation = conversationConn.model('Conversation', conversationSchema)


injectBookModel(WishlistBook);


const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1]; // Expecting "Bearer <token>"
    if (!token) return res.status(401).json({ message: "Access denied. No token provided." });
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded; // decoded contains userId
      next();
    } catch (err) {
      res.status(400).json({ message: "Invalid token" });
    }
};

const app = express();

app.use(cors()); 
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/auth/register", async (req, res) => {
  
    const { username, email, password, location} = req.body;

    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) return res.status(400).json({ message: "User already exists" });
  
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ username, email, password: hashedPassword, location: location, ratings: 5});
      await user.save();
  
      res.status(201).json({ message: "User registered successfully" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
});

app.post("/auth/login", async (req, res) => {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });
      if (!user) return res.status(400).json({ message: "Invalid credentials" });
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });
      
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '2h' });
      
      res.json({ token, user: { id: user._id, username: user.username } });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
});

app.get("/books", async (req, res) => {
  const query = req.query.query?.toLowerCase() || "";
  try {
    const books = await OfferedBook.find();
    const filtered = books.filter(book => book.title.toLowerCase().includes(query) || book.author.toLowerCase().includes(query));
    res.json(filtered);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/books/:id", async (req, res) => {
  try {
    const book = await OfferedBook.findById(req.params.id);
    if (!book) return res.status(404).json({ error: 'Book not found' });
    res.json(book);
  } catch (err) {
    res.status(404).json({ error: 'Book not found' });
  }
});

app.get("/genres", async (req, res) => {
  try {
    const genres = await OfferedBook.distinct("genre");
    res.json(genres);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/genres/:genre", async (req, res) => {
  try {
    const genre = req.params.genre.toLowerCase();
    const books = await OfferedBook.find({ genre: { $regex: new RegExp(genre, "i") } });
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/feed", async (req, res) => {
  try {
    const books = await OfferedBook.find().sort({ createdAt: -1 }).limit(20);
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/new", async (req, res) => {
  try {
    const books = await OfferedBook.find().sort({ createdAt: -1 }).limit(20);
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/popular", async (req, res) => {
  try {
    const books = await OfferedBook.aggregate([{ $sample: { size: 20 } }]);
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/users/:id", async (req, res) => {
  const user = await User.find({ "_id": req.params.id });
  res.json(user);
});

app.get("/foryou", async (req, res) => {
    const userId = req.query.id;

})

//middleware for authentication, every route after this line will be checked for authentication
//modify the front end code accordingly (see Login.js for an example)
app.use(authMiddleware)

app.get("/user", async (req, res) => {
    const userId = req.query.id;
    const user = await User.findById(userId);
    res.json(user);
});

app.get("/user/wishlist", authMiddleware, async (req, res) => {
  try {
    const books = await WishlistBook.find( { userId: req.user.userId });
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/user/offered", authMiddleware, async (req, res) => {
  try {
    const books = await OfferedBook.find({ owner: req.user.userId  });
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/users/:id/wishlist", authMiddleware, async (req, res) => {
  try {
    const books = await WishlistBook.find({ userId: req.params.id });
    res.json(books);
  } catch (err) {
    console.error("Error fetching wishlist for user:", err);
    res.status(500).json({ error: "Failed to fetch wishlist" });
  }
});

// Get public offered books for a specific user
app.get("/users/:id/offered", authMiddleware, async (req, res) => {
  try {
    const books = await OfferedBook.find({ owner: req.params.id }); 
    res.json(books);
  } catch (err) {
    console.error("Error fetching offered books for user:", err);
    res.status(500).json({ error: "Failed to fetch offered books" });
  }
});

app.post("/user/add-wishlist-book",
  body('title').notEmpty(),
  body('author').notEmpty(),
  body('isbn').notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { title, author, publisher, year, cover, isbn, genre, desc } = req.body;
    try {
      // Add book associated with userId   
      const book = new WishlistBook({ userId: req.user.userId, title, author, publisher, year, cover, isbn, genre, desc });
      await book.save();
      res.status(201).json({ message: "successfully added wishlist book" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
});

app.post("/user/add-offered-book",
  body('title').notEmpty(),
  body('author').notEmpty(),
  body('isbn').notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { title, author, publisher, year, cover, isbn, genre, desc } = req.body;
    try {
      const book = new OfferedBook({ owner: req.user.userId,  // ✅ correct field
        title, author, publisher, year, cover, isbn, genre, desc});
      await book.save();
      res.status(201).json({ message: "successfully added offered book" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
});

// Check if a certain book is in the user's wishlist by ISBN
// Use authMiddleware to ensure user exists(?) idk im following the comment on line 233
app.get("/user/wishlist/:isbn", authMiddleware, async (req, res) => {
  const { isbn } = req.params;
  try {
    // Search for the book in the user's wishlist
    const book = await WishlistBook.findOne({ userId: req.user.userId, isbn });
    if (book) {
      res.json({ exists: true });
    } else {
      res.json({ exists: false });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/user/get-recommended-books", authMiddleware, async (req, res) => {
    const userId = req.user.userId;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });
    try {
        const userLocation = user.location; // Save user's location

        // Get the genres of the books the user has offfered
        // const userOfferedBooks = await OfferedBook.find({ owner: userId });
        // const userGenres = userOfferedBooks.map(book => book.genre);
        
        // aggregate call joins OfferedBook and User collection
        // Matches books by the owner field in OfferedBook the the _id field in User
        const books = await OfferedBook.aggregate([  
            {
              $lookup: {
                from: "users", // Lookup from the User collection
                localField: "owner", // find field of owner
                foreignField: "_id",
                as: "ownerDetails" // name the lookup as ownerDetails
              }
            },
            {
              $unwind: "$ownerDetails" // unwind ownerDetails so we can access the fields
            },
            {
              $match: {
                "ownerDetails.location": userLocation, // find books by user's location
                // "genre": { $in: userGenres }, // match books that share genres with the user's offered books
                "owner": { $ne: new mongoose.Types.ObjectId(userId) } // exclude books offered by the current user
              }
            },
            {
              $sort: { createdAt: -1 }
            }
          ]);
        console.log(books);
        res.json(books);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post("/user/search-google-books", async (req, res) => {
  const query = req.body.query;
  if (!query) return res.status(400).json({ error: 'Missing query parameter' });

  try {
    const results = await searchGoogleBooks(query);
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/user/edit", authMiddleware, async (req, res) => {
try {
    const userId = req.user.userId;
    const { username, email, location } = req.body.user;

    const update = {};
    if (username.trim() != null && username.trim() != "") update.username = username.trim();
    if (email.trim() != null && email.trim()!="") update.email = email.trim();
    if (location.trim() != null && location.trim() != "") update.location = location.trim();

    const updatedUser = await User.findByIdAndUpdate(
    userId,
    { $set: update },
    { new: true }
    );

    res.json({ message: "User updated", user: updatedUser });
} catch (err) {
    console.error("Error updating user:", err);
    res.status(500).json({ message: "Internal server error" });
}
});

app.delete("/user/wishlist/:id", authMiddleware, async (req, res) => {
  try {
    const book = await WishlistBook.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.userId
    });

    if (!book) {
      return res.status(404).json({ message: "Book not found or not authorized" });
    }

    res.json({ message: "Book successfully deleted" });
  } catch (err) {
    console.error("Error deleting wishlist book:", err);
    res.status(500).json({ message: "Internal server error while deleting wishlist book" });
  }
});

app.delete("/user/offered/:id", authMiddleware, async (req, res) => {
  try {
    const book = await OfferedBook.findOneAndDelete({
      _id: req.params.id,
      owner: mongoose.Types.ObjectId.createFromHexString(req.user.userId)
    });

    if (!book) {
      return res.status(404).json({ message: "Book not found or not authorized" });
    }

    res.json({ message: "Book successfully deleted" });
  } catch (err) {
    console.error("Error deleting offered book:", err);
    res.status(500).json({ message: "Internal server error while deleting offered book" });
  }
});


app.post("/logout", (req, res) => {
  res.status(200).json({ message: "Logout: test msg" });
});

app.get("/messages", async (req, res) => {
  try {
    const userId = req.user.userId
    
    const conversations = await Conversation.find({
      users: {
        $in: userId
      }
    })

    const formattedConversations = conversations.map(convo => {
      const otherUser = req.user.userId == convo[0] ? convo[1] : convo[0]
      return {
        id: convo["_id"],
        otherUser: otherUser,
      }
    })

    res.json(formattedConversations)

  } catch (err) {
    console.error("Error fetching conversations: ", err);
    res.status(500).json({ message: "Internal server error while fetching conversations" })
  }
});

app.get("/messages/:user", async (req, res) => {

  try {
    const conversation = await Conversation.find({
      users: {
        $in: [req.params.user, req.user.userId]
      }
    })

    if (!conversation) {
      res.status(404).json({ message: "Conversation not found" })
    }

    const messages = await Message.find({ conversation: conversation["_id"] })

    const formattedMessages = messages.map(msg => {
      // Just gets the user that isn't the current user in the conversation
      const otherUser = conversation.users[conversation.users.indexOf(msg.user) ^ 1]
      if (msg.user == req.user.userId) {
        const sender = req.user.userId
        const receiver = otherUser
      } else {
        const sender = otherUser
        const receiver = req.user.userId
      }

      return { 
        id: msg["_id"],
        sender: sender,
        receiver: receiver,
        content: msg.content,
        timestamp: msg.timestamp
      }
    }) 

    res.json(formattedMessages)
  }
  catch (err) {
    console.err("Error fetching messages: " + err)
    res.status(500).json({ message: "Internal server error while fetching messages" })
  }
});

app.post("/messages/:user", async (req, res) => {
  const { content } = req.body

  try {
    const conversation = await conversationSchema.find({ 
      users: {
        $in: [req.params.user, req.user.userId]
      }, 
    })
    if (!conversation) {
      const newConversation = new Conversation({
        users: [req.params.user, req.user.userId]
      })
      conversation = await newConversation.save()
    }

    const message = new Message({
      timestamp: new Date(),
      content: content,
      conversation: conversation["_id"],
      user: req.user.userId
    })
  } 
  catch (err) {
    console.error("Error sending message")
    res.status(500).json({ message: "Internal server error while sending message" })
  }
})

export default app;