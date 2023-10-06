const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Connect to DB
const DB_URL = "mongodb+srv://chaudharyvikrant2000:vikrant2000@cluster0.uqgimnj.mongodb.net/";
mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", () => { console.error("connection error:") });
db.once("open", () => {
  console.log("Connected to DB");
});

// Middlewares
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(bodyParser.json());


module.exports = app;