const sharp = require('sharp');
const {getImage, insertImage} = require('../repository/imagedata')

//Image Upload
const uploadImage = (req,res) => {

    if(req.fileValidationError) {
        return res.send(req.fileValidationError);
    }

    const insertList = [];
    req.files.forEach(file => {
        const { originalname, buffer, mimetype } = file;

        insertList.push(
            insertImage(originalname, buffer, mimetype)
                .then(data => { 
                    return {
                        id : data.rows[0].id,
                        name : originalname 
                    };
                })
        );
    });

    Promise.all(insertList)
        .then(dataList => res.send(dataList))
        .catch(e => res.send(e));
}

//Image Retrieve

//Supported format list
const formatMapList = [
    { format: 'png', mimeType : 'image/png' },
    { format: 'jpeg', mimeType : 'image/jpeg' },
    { format: 'jpg', mimeType : 'image/jpeg' },
    { format: 'svg', mimeType : 'image/png' }
];

const getMimeType = (format) => {
    const formatMap = formatMapList.find(m => m.format === format);

    return formatMap ? formatMap.mimeType : '';
}

const getFormat = (mimeType) => {
    const formatMap = formatMapList.find(m => m.mimeType === mimeType);

    return formatMap ? formatMap.format : '';
}

const getProcessedImage = (req,res) => {

    const {id} = req.params;

    const {resize, rotate, filter} = req.query;

    const idParts = id.split('.');

    const imageId = idParts[0]
    const imageFormat = idParts[1]
    
    let mimeType = getMimeType(imageFormat);

    if (imageFormat && !mimeType) {
        return res.send("Image format is not recognized")
    }

    getImage(imageId)
    .then(data => {
        mimeType = mimeType || data.mimetype;
        format = getFormat(mimeType)

        sharp(data.image)
            .rotate(rotate ? Number(rotate) : null)
            .resize(resize ? Number(resize): null)
            .toColourspace(filter || 'srgb' )
            .toFormat(format)
            .toBuffer()
            .then(processed => {
                res.contentType(mimeType);
                res.send(processed);
            });
    })
    .catch(e => res.send(e))
    .catch(e => console.log(e));
}

const getResizedImage = (req,res) => {
    
    const {id, resize} = req.params;

    getImage(id)
        .then(data => {
            sharp(data.image)
                .resize(resize ? Number(resize): null)
                .toBuffer()
                .then(processed => {
                    res.contentType(data.mimetype);
                    res.send(processed);
                });
        })
        .catch(e => res.send(e))
}

const getRotatedImage = (req,res) => {
    
    const {id, rotate} = req.params;

    getImage(id)
        .then(data => {
            sharp(data.image)
                .rotate(rotate ? Number(rotate) : null)
                .toBuffer()
                .then(processed => {
                    res.contentType(data.mimetype);
                    res.send(processed);
                });
        })
        .catch(e => res.send(e))
}

const getFilteredImage =  (req,res) => {
    
    const {id, filter} = req.params;

    getImage(id)
        .then(data => {
            sharp(data.image)
                .toColourspace(filter || 'srgb' )
                .toBuffer()
                .then(processed => {
                    res.contentType(data.mimetype);
                    res.send(processed);
                }) 
        })
        .catch(e => res.send(e))
}


module.exports = {
    uploadImage,
    getProcessedImage, 
    getResizedImage,
    getRotatedImage,
    getFilteredImage
}