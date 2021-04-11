require('dotenv').config();
const express = require('express')
const path = require("path")
const imageRoute = require("./routers/imageroute")
const cors = require('cors');
const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors());

app.get('/', (req, res) => res.sendFile(path.join(__dirname+"/index.html" )))
app.use('/api', imageRoute);

app.listen(PORT, () => console.log('connected'));

module.exports = app;