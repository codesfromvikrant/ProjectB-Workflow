const express = require('express');
const router = express.Router();
const dotenv = require('dotenv');
dotenv.config({ path: '../config.env' });
const multer = require('multer');
const fs = require('fs');
const Gallery = require('../models/gallery');

const cloudinary = require('cloudinary').v2;

cloudinary.config({
  secure: true,
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  },
});

const upload = multer({ storage });

router.get('/:userID', async (req, res) => {
  try {
    const { userID } = req.params;
    const result = await Gallery.findOne({ userID });
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const { userID } = req.body;
    const gallery = new Gallery({
      userID,
      images: []
    });
    const newGallery = await gallery.save();
    res.status(200).json({ message: "Gallery Built Successfully!", newGallery });
  } catch (err) {
    console.log(err);
  }
})


router.patch('/upload', upload.single('image'), async (req, res) => {
  try {
    const { userID } = req.body;
    const uploadedImage = req.file;

    const result = await cloudinary.uploader.upload(uploadedImage.path, { folder: `user-${userID}/` });
    result && fs.unlink(uploadedImage.path, (err) => {
      if (err) throw err;
      console.log('File deleted!');
    });

    await Gallery.findOneAndUpdate({ userID }, { $push: { images: result } }, { new: true });
    res.status(200).json({ message: 'Image uploaded', result });
  } catch (err) { console.log(err) }
});

module.exports = router;