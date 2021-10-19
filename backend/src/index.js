require("dotenv").config();
import { app } from "./app.js";
const mongoose = require("mongoose");

const port = 8080;

mongoose.Promise = global.Promise;

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.bfjqe.mongodb.net/db?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("conectado a la bd en mongoAtlas");
    app.listen(port, () => {
      console.log("conectado al puerto 8080(listen)");
    });
  })
  .catch((err) => console.log(err));
