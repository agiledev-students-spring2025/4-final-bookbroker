import axios from 'axios';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();


mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("Connected to MongoDB"))
.catch(err => console.error("MongoDB connection error:", err));


// user schema for db
const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email:    { type: String, required: true, unique: true },
    password: { type: String, required: true },
    location: String,
    ratings: Number,
    wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'WishlistBook' }],
    offered:  [{ type: mongoose.Schema.Types.ObjectId, ref: 'OfferedBook' }]
});

const User = mongoose.model('User', userSchema);


// === Google Books API Search ===
async function searchGoogleBooks(query) {
  const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}`);
  return response.data.items.map(item => ({
    title: item.volumeInfo.title,
    author: item.volumeInfo.authors?.join(', ') || 'Unknown',
    publisher: item.volumeInfo.publisher || 'Unknown',
    year: item.volumeInfo.publishedDate?.substring(0, 4),
    cover: item.volumeInfo.imageLinks?.thumbnail,
    isbn: item.volumeInfo.industryIdentifiers?.[0]?.identifier || '',
    genre: item.volumeInfo.categories?.[0] || 'Unknown',
    desc: item.volumeInfo.description || ''
  }));
}

// === MongoDB Book Retrieval Placeholder (inject model later) ===
let BookModel = null;

function injectBookModel(model) {
  BookModel = model;
}

async function getBook(id) {
  if (!BookModel) throw new Error('Book model not injected');
  return await BookModel.findById(id);
}

async function getBooks(limit = 100) {
  if (!BookModel) throw new Error('Book model not injected');
  return await BookModel.find().limit(limit);
}

async function getGenres(limit = 10) {
  if (!BookModel) throw new Error('Book model not injected');
  const books = await BookModel.find().select('genre -_id');
  const uniqueGenres = [...new Set(books.map(b => b.genre).filter(Boolean))];
  return uniqueGenres.slice(0, limit);
}

// === User & Messaging Placeholder ===
function generateUser() {
  return {
    id: Math.floor(Math.random() * 1000000),
    username: 'guest_user',
    email: 'guest@example.com',
    trades: 0,
    location: 'Unknown',
    ratings: 0
  };
}

function generateMessages(user1Id, messageCount = 5) {
  return Array.from({ length: messageCount }, (_, i) => {
    return {
      id: `${Date.now()}-${i}`,
      senderId: user1Id,
      receiverId: user1Id + i + 1,
      content: `Message ${i + 1}`,
      timestamp: new Date().toISOString(),
      otherUser: generateUser()
    };
  });
}

function generateConversation(user1Id, user2Id, messageCount = 5) {
  return Array.from({ length: messageCount }, (_, i) => {
    return {
      id: `${Date.now()}-${i}`,
      senderId: i % 2 === 0 ? user1Id : user2Id,
      receiverId: i % 2 === 0 ? user2Id : user1Id,
      content: `Message ${i + 1}`,
      timestamp: new Date().toISOString()
    };
  });
}

export {
  injectBookModel,
  searchGoogleBooks,
  getBook,
  getBooks,
  getGenres,
  generateUser,
  generateMessages,
  generateConversation,
  User
};
