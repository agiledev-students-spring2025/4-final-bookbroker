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

// Generate one message
function generateMessage(senderId, receiverId){
    return {
        id: faker.string.uuid(),
        senderId: senderId,
        receiverId: receiverId,
        content: faker.lorem.sentences({ min:1, max:3 }),
        timestamp: faker.date.recent({ days: 30 }).toISOString(),
    };
}

// Generate multiple messages between two users
function generateConversation(user1Id, user2Id, messageCount = 5){
    const messages = [];
    for( let i = 0; i < messageCount; i++ ){
        // Alternating sender
        const senderId = i % 2 === 0 ? user1Id : user2Id;
        const receiverId = senderId === user1Id ? user2Id : user1Id;

        messages.push(generateMessage(senderId, receiverId));
    }

    // Return messages in order by date
    return messages.sort((a,b) => new Date(a.timestamp) - new Date(b.timestamp));
}

// Generate multiple messages from random users
function generateMessages(user1Id, messageCount = 5){
    let conversations = [];
    for (let i = 0; i < messageCount; i++) {
        // Generate random user
        const otherUserId = Math.floor(Math.random() * SEED_CAP) + 1;

        // Randomly choose client or other user as a sender
        // This is probably not necessary (?)
        const sender = faker.datatype.boolean() ? user1Id : otherUserId;
        const reciever = sender === user1Id ? otherUserId : user1Id;

        const message = generateMessage(sender, reciever)

        // Send back a message and the associated user
        conversations.push({otherUser: getUser(otherUserId), lastMessage: message});
    };
    return conversations;
}



export { generateBook, getBook, generateBooks, getBookImage, getGenres, getUser, generateUser, generateMessages, generateConversation }