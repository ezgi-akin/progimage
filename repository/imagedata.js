const pool = require('./dbinit')

const getImage = (id) => pool.query(`SELECT * FROM image_uploads WHERE id = $1;`, [id]).then(data => data.rows[0])

const insertImage = (originalname, buffer, mimetype) => pool.query(`INSERT INTO image_uploads (name, image, mimetype) VALUES ($1, $2, $3) RETURNING ID`, [originalname, buffer, mimetype])

module.exports = {
    getImage,
    insertImage
}