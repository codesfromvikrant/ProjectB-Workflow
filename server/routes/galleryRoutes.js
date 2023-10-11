const express = require('express');
const router = express.Router();
const galleryControllers = require('../controllers/galleryControllers');
const upload = require('../middlewares/multer');

router.get('/:userID', galleryControllers.getAllImages);

router.delete('/:userID', galleryControllers.deleteImage);

router.route('/')
  .post(galleryControllers.createGallery)
  .patch(upload.single('image'), galleryControllers.uploadImage);

module.exports = router;