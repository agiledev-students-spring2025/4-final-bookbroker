import express from 'express';
import cors from 'cors'; 
import {
  generateBooks,
  getBook,
  getGenres,
  getUser,
  generateUser,
  getBookImage
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

// export the express app we created to make it available to other modules
export default app;