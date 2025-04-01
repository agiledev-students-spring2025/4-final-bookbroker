import { use, expect, should, assert } from 'chai'
import { default as chaiHttp, request } from 'chai-http'
import app from '../app.js' 

use(chaiHttp)

it('GET /books should return an array of books', (done) => {
  request
    .agent(app)
    .get('/books')
    .end((err, res) => {
      expect(err).to.be.null;
      expect(res).to.have.status(200);
      expect(res).to.be.json;
      expect(res.body).to.be.an('array');
      expect(res.body[0]).to.have.property('title');
      done();
    });
});

it('GET /books/:id should return a book object', (done) => {
  request
    .agent(app)
    .get('/books/1')
    .end((err, res) => {
      expect(err).to.be.null;
      expect(res).to.have.status(200);
      expect(res).to.be.json;
      expect(res.body).to.have.property('id');
      expect(res.body).to.have.property('title');
      done();
    });
});

it('GET /genres should return a list of genres', (done) => {
  request
    .agent(app)
    .get('/genres')
    .end((err, res) => {
      expect(err).to.be.null;
      expect(res).to.have.status(200);
      expect(res).to.be.json;
      expect(res.body).to.be.an('array');
      done();
    });
});

it('GET /genres/:genre should return filtered books', (done) => {
  request
    .agent(app)
    .get('/genres/adventure') 
    .end((err, res) => {
      expect(err).to.be.null;
      expect(res).to.have.status(200);
      expect(res).to.be.json;
      expect(res.body).to.be.an('array');
      // Expect genre of all requested books to match requested genre
      res.body.forEach(book => expect(book.genre).to.equal('Adventure'))
      done();
    });
});

it('GET /feed should return a nonempty array of book objects', (done) => {
  request
    .agent(app)
    .get('/feed')
    .end((err, res) => {
      expect(err).to.be.null;
      expect(res).to.have.status(200);
      expect(res).to.be.json;
      expect(res.body).to.be.an('array');
      expect(res.body[0]).to.have.property('title');
      expect(res.body[0]).to.have.property('author');
      expect(res.body[0]).to.have.property('userid');
      expect(res.body[0]).to.have.property('isbn');
      done();
    });
});

it('GET /users/:id/wishlist should return an array of book objects', (done) => {
  request
    .agent(app)
    .get('/users/1/wishlist')
    .end((err, res) => {
      expect(err).to.be.null
      expect(res).to.have.status(200)
      expect(res).to.be.json
      expect(res.body).to.be.an('array')
      // Make sure each returned item is a proper book
      res.body.forEach(book => {
        expect(book).to.have.property('title')
        expect(book).to.have.property('author')
        expect(book).to.have.property('isbn')
      })
      done()
    })
})

it('GET /users/:id/offered should return an array of book objects', (done) => {
  request
    .agent(app)
    .get('/users/1/offered')
    .end((err, res) => {
      expect(err).to.be.null
      expect(res).to.have.status(200)
      expect(res).to.be.json
      expect(res.body).to.be.an('array')
      // Make sure each returned item is a proper book
      res.body.forEach(book => {
        // Will need to make sure the requested user's id matches the book's userid,
        // but there is not a mechanism for that at this point
        expect(book).to.have.property('title')
        expect(book).to.have.property('author')
        expect(book).to.have.property('isbn')
      })
      done()
    })
})

it("GET /user/wishlist should return the current user's wishlist", (done) => [
  request
    .agent(app)
    .get('/user/wishlist')
    .end((err, res) => {
      expect(err).to.be.null
      expect(res).to.have.status(200)
      expect(res).to.be.json
      expect(res.body).to.be.an('array')
      // Make sure each returned item is a proper book
      res.body.forEach(book => {
        expect(book).to.have.property('title')
        expect(book).to.have.property('author')
        expect(book).to.have.property('isbn')
      })
      done()
    })
])

it("GET /user/offered should return the current user's wishlist", (done) => [
  request
    .agent(app)
    .get('/user/offered')
    .end((err, res) => {
      expect(err).to.be.null
      expect(res).to.have.status(200)
      expect(res).to.be.json
      expect(res.body).to.be.an('array')
      // Make sure each returned item is a proper book
      res.body.forEach(book => {
        // Will need to make sure that the book's userid matches the current user,
        // But still waiting on login for that
        expect(book).to.have.property('title')
        expect(book).to.have.property('author')
        expect(book).to.have.property('isbn')
      })
      done()
    })
])

