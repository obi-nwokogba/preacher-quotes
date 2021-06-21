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
app.use(express.static('public'));

// ===========================================
// USER ROUTES - TO BE PUT IN USER CONTROLLER
// ===========================================
// HOME ROUTE
// ===========================================
const User = require('./models/user');
const Preacher = require('./models/preacher');
const Quote = require('./models/quote');


app.get('/', async (req, res) => {
    try {
        const preachers = await Preacher.find({});
        const quotes = await Quote.find({}).sort({date: -1});
        const users = await User.find({});
        console.log(users);
        res.render('index', {preachers,quotes,users});
    } catch (error) {
        console.log(error);
        res.redirect('/quotes');
    }
});


// ===========================
// Mount Controller Middlware
// ===========================
app.use('/users', require('./controllers/users'));
app.use('/quotes', require('./controllers/quotes'));
app.use('/preachers', require('./controllers/preachers'));

// =======================================
// Tell express to listen
// =======================================
app.listen(port, () => {
    console.log(`Express is listening on port:${port}`);
});