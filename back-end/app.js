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
  getBook,
  getBooks,
  getGenres,
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

// Connect to main cluster, two DBs within same cluster
const wishlistConn = mongoose.createConnection(process.env.MONGODB_URI + '/wishlist', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const offeredConn = mongoose.createConnection(process.env.MONGODB_URI + '/offered', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const WishlistBook = wishlistConn.model('WishlistBook', wishlistBookSchema);
const OfferedBook = offeredConn.model('OfferedBook', offeredBookSchema);

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
    const { username, email, password, location } = req.body;
    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) return res.status(400).json({ message: "User already exists" });
  
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ username, email, password: hashedPassword, location });
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

app.get("/messages", (req, res) => {
  const currentUserId = Math.floor(Math.random() * 2500000) + 1;
  const messages = generateMessages(currentUserId);
  const formattedMessages = messages.map(msg => ({
    id: msg.id,
    otherUser: msg.otherUser.username,
    sender: msg.senderId === currentUserId ? "You" : msg.otherUser.username,
    receiver: msg.receiverId === currentUserId ? "You" : msg.otherUser.username,
    content: msg.content,
    timestamp: msg.timestamp
  }));
  res.json(formattedMessages);
});

app.get("/messages/:user", (req, res) => {
  const clientUserId = Math.floor(Math.random() * 2500000) + 1;
  const otherUser = generateUser();
  otherUser.username = req.params.user;
  const conversation = generateConversation(clientUserId, otherUser.id);
  const formattedConversation = conversation.map(msg => ({
    id: msg.id,
    sender: msg.senderId === clientUserId ? "You" : otherUser.username,
    receiver: msg.receiverId === clientUserId ? "You" : otherUser.username,
    content: msg.content,
    timestamp: msg.timestamp
  }));
  res.json(formattedConversation);
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

app.get("/users/:id", (req, res) => {
  const user = generateUser();
  res.json(user);
});


app.use(authMiddleware)

app.get("/user", (req, res) => {
  const user = generateUser();
  res.json(user);
});

app.get("/user/wishlist", async (req, res) => {
  try {
    const books = await WishlistBook.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/user/offered", async (req, res) => {
  try {
    const books = await OfferedBook.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
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
      const book = new WishlistBook({ title, author, publisher, year, cover, isbn, genre, desc });
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
      const book = new OfferedBook({ title, author, publisher, year, cover, isbn, genre, desc });
      await book.save();
      res.status(201).json({ message: "successfully added offered book" });
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

app.post("/profile/edit", (req, res) => {
  const user = req.body.user;
  console.log(user);
  res.status(200).json(user);
});

app.post("/logout", (req, res) => {
  res.status(200).json({ message: "Logout: test msg" });
});

export default app;