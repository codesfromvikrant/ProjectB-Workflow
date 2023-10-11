const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const mongoose = require('mongoose');

const galleryRoutes = require('./routes/galleryRoutes');

// const DB_URL = process.env.DATABASE_URL;
const DB_URL = "mongodb+srv://chaudharyvikrant2000:vikrant2000@cluster0.uqgimnj.mongodb.net/"
mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", () => { console.error("connection error:") });
db.once("open", () => {
  console.log("Connected to DB");
});

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(bodyParser.text({ type: '/' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/v1/gallery', galleryRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!');
});


module.exports = app;