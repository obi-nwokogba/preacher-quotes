


require('dotenv').config();

// ================================
// Dependencies
// ================================
const express = require('express');
const port = process.env.PORT || 3000;
const methodOverride = require('method-override');
const logger = require('morgan');
const fileUpload = require('express-fileupload');
const app = express();

// ================================
// Configure Mongoose
// ================================


app.set('view engine', 'ejs');

// Configure Mongoose
const mongoose = require('mongoose');
const db = mongoose.connection;

mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
});

db.on('connected', () => console.log('mongo connected'));
db.on('error', (err) => console.log(err.message, ' is mongo connected?'));
db.on('disconnected', () => console.log('mongo disconnected'));

// =====================
// Mount Middleware
// =====================
app.use(fileUpload({createParentPath:true}));
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(logger('dev'));







// =====================
// Tell express to listen
// =====================
app.listen(port, () => {
    console.log(`Express is listening on port:${port}`);
});