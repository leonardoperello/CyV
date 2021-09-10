require('dotenv').config();
const app = require('./app.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose
    .connect(

        `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.bfjqe.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
    )
    .then(() => {
        console.log('conectado a la bd');
    })
    .catch((err) => console.log(err));