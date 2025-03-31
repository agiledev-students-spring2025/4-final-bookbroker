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
    .get('/genres/fiction') 
    .end((err, res) => {
      expect(err).to.be.null;
      expect(res).to.have.status(200);
      expect(res).to.be.json;
      expect(res.body).to.be.an('array');
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
      done();
    });
});