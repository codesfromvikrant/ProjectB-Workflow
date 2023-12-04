const Gallery = require('../models/gallery');
const { query } = require('express');
const catchAsync = require('../utils/catchAsync');
const cloudinary = require('../middlewares/cloudinary');

exports.getAllImages = catchAsync(async (req, res, next) => {
  try {
    const { userID } = req.params;
    const search = req.query.search || '';
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    let result = await Gallery.findOne({ userID });

    if (!result) {
      return res.status(404).json({ message: 'User not found' });
    }

    const images = result.images.filter(image => image.original_filename.includes(search));

    const startIndex = (page - 1) * limit;
    let endIndex = page * limit;
    const total_images = images.length;
    if (endIndex > total_images) endIndex = total_images;

    const paginatedImages = images.slice(startIndex, endIndex);

    res.status(200).json({ images: paginatedImages, total_images });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

exports.createGallery = catchAsync(async (req, res, next) => {
  const { userID } = req.body;
  const gallery = new Gallery({
    userID,
    images: []
  });

  const newGallery = await gallery.save();
  res.status(200).json({ message: "Gallery Built Successfully!", newGallery });
});

exports.uploadImage = catchAsync(async (req, res, next) => {
  const { userID } = req.body;
  const uploadedImage = req.file;

  const result = await cloudinary.uploader.upload(uploadedImage.path, { folder: `user-${userID}/` });
  result && fs.unlink(uploadedImage.path, (err) => {
    if (err) throw err;
    console.log('File deleted!');
  });

  await Gallery.findOneAndUpdate({ userID }, { $push: { images: result } }, { new: true });
  res.status(200).json({ message: 'Image uploaded', result });
});

exports.deleteImage = catchAsync(async (req, res, next) => {
  const { userID } = req.params;
  const { publicID } = req.query;
  cloudinary.uploader.destroy(publicID, (err) => {
    if (err) throw err;
    console.log('Image deleted from cloudinary!');
  });
  const result = await Gallery.findOneAndUpdate({ userID }, { $pull: { images: { public_id: publicID } } }, { new: true });
  res.status(200).json({ message: 'Image deleted', result });
});
