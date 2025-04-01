import express from 'express';
import cors from 'cors'; 
import {
  generateBooks,
  getBook,
  getGenres,
  getUser,
  generateUser,
  getBookImage,
  generateMessages,
  generateConversation
} from './Data.js';

const app = express();

app.use(cors()); 
app.use(express.json());

app.get("/books", (req, res) => {
    const query = req.query.query?.toLowerCase() || "";
    const books = generateBooks(250);
    const filtered = books.filter(book => book.title.toLowerCase().includes(query) || book.author.toLowerCase().includes(query));
    res.json(filtered);
});
//e.g. for searching: fetch("http://localhost:3000/books?query=Some%20Book%20Name520Or%20Author)

app.get("/books/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const book = getBook(id);
    res.json(book);
});

app.get("/genres", (req, res) => {
    const genres = [...new Set(getGenres(15))];
    res.json(genres);
});

app.get("/genres/:genre", (req, res) => {
    const genre = req.params.genre.toLowerCase();
    const books = generateBooks(250).filter(book =>
      book.genre.toLowerCase() === genre
    );
    res.json(books);
});

app.get("/messages", (req, res) => {
    const currentUserId = Math.floor(Math.random() * 2500000) + 1;

    // Generate array of users and messages
    const messages = generateMessages(currentUserId);

    // Format messages so the frontend can use interpret them
    const formattedMessages = messages.map(msg => ({
        id: msg.id,
        otherUser: msg.otherUser.username,
        sender: msg.lastMessage.senderId === currentUserId ? "You" : msg.otherUser.username,
        receiver: msg.lastMessage.receiverId === currentUserId ? "You" : msg.otherUser.username,
        content: msg.lastMessage.content,
        timestamp: msg.lastMessage.timestamp
      }));
    res.json(formattedMessages)
})

app.get("/messages/:user", (req, res) => {
    const clientUserId = Math.floor(Math.random() * 2500000) + 1;

    // Find other user by username
    // This is where we'll query the DB
    const otherUser = generateUser();
    otherUser.username = req.params.user; // Currently override the generated username with the requested username for continuity purposes

    // Generate array of messages
    const conversation = generateConversation(clientUserId, otherUser.id);

    // Format conversation for front end
    const formattedConversation = conversation.map(msg => ({
        id: msg.id,
        sender: msg.senderId === clientUserId ? "You" : otherUser.username,
        receiver: msg.receiverId === clientUserId ? "You" : otherUser.username,
        content: msg.content,
        timestamp: msg.timestamp
    }));

    res.json(formattedConversation);
})

app.get('/feed', (req, res) => {
    const books = generateBooks(20).map(book => ({
      ...book,
      imageUrl: getBookImage(book.id),
    }));
    res.json(books);
  });

app.get("/users/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const user = getUser(id);
    res.json(user);
});

app.get('/user', (req, res) => {
    const user = generateUser();
    res.json(user);
});

app.get('/users/:id/wishlist', (req, res) => {
    res.json(generateBooks(10));
})

app.get('/users/:id/offered', (req, res) => {
    res.json(generateBooks(10));
})

app.get('/user/wishlist', (req, res) => {
    res.json(generateBooks(10)); 
});

app.get('/user/offered', (req, res) => {
    res.json(generateBooks(10)); 
});

app.post('/user/add-wishlist-book', (req, res) => {
    const book = req.body;
    console.log(book);
    res.status(200).json({ message: 'successfully added wishlist book' });
})

app.post('/user/add-offered-book', (req, res) => {
    const book = req.body;
    console.log(book);
    res.status(200).json({ message: 'successfully added offered book' });
})
// export the express app we created to make it available to other modules
export default app;