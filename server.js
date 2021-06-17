require('dotenv').config();

// ================================
// Dependencies
// ================================
const express = require('express');
const port = process.env.PORT || 3000;
const methodOverride = require('method-override');
const logger = require('morgan');
//const fileUpload = require('express-fileupload');

// Initialize Express
const app = express();

// Set view engine
app.set('view engine', 'ejs');

// ================================
// Configure Mongoose
// ================================
// Configure Mongoose
const mongoose = require('mongoose');
const db = mongoose.connection;

mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
});

db.on('connected', () => console.log('MongoDB connected'));
db.on('error', (err) => console.log(err.message, ' is mongo connected?'));
db.on('disconnected', () => console.log('MongoDB disconnected'));

// =======================================
// Mount Middleware
// =======================================
//app.use(fileUpload({createParentPath:true}));
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
//app.use(logger('dev'));
app.use(express.static('public'));


















// =======================================
// USER ROUTES - TO BE PUT IN USER CONTROLLER
// =======================================
// HOME ROUTE
// =======================================
app.get('/', (req, res) => res.render('index'));


// =====================
// Mount Controller Middlware
// =====================
app.use('/users', require('./controllers/users'));
app.use('/quotes', require('./controllers/quotes'));
app.use('/preachers', require('./controllers/preachers'));

// =======================================
// Tell express to listen
// =======================================
app.listen(port, () => {
    console.log(`Express is listening on port:${port}`);
});










// =======================================
// =======================================
// =======================================
// =======================================
// =======================================
// ============================
// ============================
// ============================
// ============================
// ============================
// ============================
// ============================
// ============================







// =======================================
// QUOTES ROUTES
// =======================================
// HOME ROUTE
// =======================================

