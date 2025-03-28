import { faker } from '@faker-js/faker';

const SEED_CAP = 2500000

function generateBook() {
        const id = Math.floor(Math.random() * SEED_CAP)+1

        const book = getBook(id)

        return book
}

function getBook(id) {
    faker.seed(id)

    const userid = Math.floor(Math.random() * SEED_CAP)+1
    const book = {
        id: id,
        title: faker.book.title(),
        author: faker.book.author(),
        userid: userid,
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

function generateUser() {
    const id = Math.floor(Math.random() * SEED_CAP)+1

    const user = getUser(id)

    return user

}

function getUser(id) {
    faker.seed(id)

    const user = {
        id: id,
        username: faker.internet.username(),
        email: faker.internet.email(),
        trades: faker.number.int({min: 0, max:1500}),
        recentTrade: getBook(id),
        location: faker.location.city(),
        ratings: faker.number.float({min: 0, max: 5, fractionDigits: 1})
    }

    return user
}

export { generateBook, getBook, generateBooks, getBookImage, getGenres, getUser, generateUser }