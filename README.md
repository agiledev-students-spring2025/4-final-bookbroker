# BookBroker

Bookbroker is an app designed to facilitate trades between people who have books and people who want books, both to foster community and encourage reading in an affordable, sustainable way.

BookBroker is our final project for our Agile Software Development course at NYU.

[Contributing Guidelines](./CONTRIBUTING.md)

## Team Members
- [Isaac](https://github.com/isaac1000000)
- [Sewon](https://github.com/SewonKim0)
- [Rainn](https://github.com/Rainn-J)
- [Shayne](https://github.com/shayne773)
- [Stephen](https://github.com/StephenS2021)

## Project Setup
Create a file at front-end/.env and add the following line to the file:
```
REACT_APP_SERVER_ADDRESS="http://localhost:5000"
```

Create a file at back-end/.env and add the following line to the file:
```
MONGODB_URI=mongodb+srv://rain:rain12345678@bookbroker.nelw2as.mongodb.net/?retryWrites=true&w=majority&appName=BookBroker
JWT_SECRET="MYSECRET"
```

### Frontend
Navigate to the frontend directory and run the react app
```
cd front-end
npm install
npm start
```

### Backend
Navigate to the backend directory and start the app:
```
cd back-end
npm install
npm start
```