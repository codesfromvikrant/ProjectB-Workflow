const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
// const fileUpload = require('express-fileupload');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const mongoose = require('mongoose');

// Routes
const galleryRoutes = require('./routes/galleryRoutes');

// Connect to DB
const DB_URL = process.env.DATABASE_URL;
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
// app.use(fileUpload());
app.use(bodyParser.text({ type: '/' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));



// Routes
app.use('/api/v1/gallery', galleryRoutes);


module.exports = app;