const express = require('express');
const multer = require('multer')
const {uploadImage, getProcessedImage, getResizedImage, getRotatedImage, getFilteredImage} = require('../controllers/imagecontroller')

const router = express.Router();
const upload = multer({ fileFilter : function(req,res,cb) {
    const regex =  /(jpg|jpeg|png|svg)$/igm;
    if(!res.mimetype.match(regex)) {
        req.fileValidationError = 'wrong mimetype';
        return cb(null, false, new Error('wrong mimetype'));
    }
    cb(null, true);
}});

router
    .route('/')
    .post(upload.array('image'), uploadImage)

router
    .route('/:id')
    .get(getProcessedImage)

router
    .route('/:id/resize/:resize')
    .get(getResizedImage)

router
    .route('/:id/rotate/:rotate')
    .get(getRotatedImage)

router
    .route('/:id/filter/:filter')
    .get(getFilteredImage)

module.exports = router;