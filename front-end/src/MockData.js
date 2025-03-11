import { faker } from '@faker-js/faker';

function generateBook() {
        const id = Math.floor(Math.random() * 2500000)+1

        const book = getBook(id)

        return book
}

function getBook(id) {
    faker.seed(id)

    const book = {
        id: id,
        title: faker.book.title(),
        author: faker.book.author(),
        user: faker.person.fullName(),
        year: faker.number.int({min: 1930, max:2025}),
        isbn: faker.commerce.isbn(),
        genre: faker.book.genre(),
        desc: faker.lorem.sentences({min: 3, max: 10})
    }

    return book
}

function generateBooks(n) {

    const books = []

    for (let i=0; i<n; i++) {
        books.push(generateBook())
    }

    return books
}

function getBookImage(id) {
    // Picsum only has so many photos
    id = Math.min(Math.floor(id / 10000), 200)

    return `https://picsum.photos/id/${id}/200/300`
}

function getGenres(n) {
    const genres = []

    for (let i=0; i<n; i++) {
        genres.push(faker.book.genre())
    }

    return genres
}

export { generateBook, getBook, generateBooks, getBookImage, getGenres }