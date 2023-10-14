const Gallery = require('../models/gallery');
const { query } = require('express');
const https = require('https');
const fs = require('fs');
const cloudinary = require('../middlewares/cloudinary');

exports.getAllImages = async (req, res) => {
  try {
    const { userID } = req.params;
    const search = req.query.search || '';
    let result = await Gallery.findOne({ userID });
    let images = result.images.filter(image => image.original_filename.includes(search));
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const startIndex = (page - 1) * limit;
    let endIndex = page * limit;
    const total_images = images.length;
    if (endIndex > total_images) endIndex = total_images;
    images = images.slice(startIndex, endIndex);

    res.status(200).json({ images, total_images });
  } catch (err) {
    console.log(err);
  }
};

exports.createGallery = async (req, res) => {
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
};

exports.uploadImage = async (req, res) => {
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
};

exports.deleteImage = async (req, res) => {
  try {
    const { userID } = req.params;
    const { publicID } = req.query;
    cloudinary.uploader.destroy(publicID, (err) => {
      if (err) throw err;
      console.log('Image deleted from cloudinary!');
    });
    const result = await Gallery.findOneAndUpdate({ userID }, { $pull: { images: { public_id: publicID } } }, { new: true });
    res.status(200).json({ message: 'Image deleted', result });
  } catch (err) { console.log(err) }
};
