// ===========================
// Dependencies
// ===========================
const router = require('express').Router();
const User = require('../models/user');
const Quote = require('../models/quote');
const Preacher = require('../models/preacher');
// Define routes/controllers

// We are mounting this controller on /users

router.get('/', async (req, res) => {
    try {
        const quotes = await Quote.find({});
        res.render('quotes/index', { quotes });
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});

// =======================================
// NEW - ADD A NEW QUOTE
// =======================================
router.get('/new', async (req, res) => {
    try {
        const preachers = await Preacher.find({});
        res.render('quotes/new', { preachers });
    } catch (error) {
        console.log(error);
        res.redirect('/quotes');
    }
});

// =======================================
// DELETE ROUTE
// =======================================
router.delete('/:id', (req, res) => {
    Quote.findByIdAndDelete(req.params.id, (err, removedQuote) => {
        res.redirect('/quotes');
    });
});

// =======================================
// UPDATE ROUTE
// =======================================
router.put('/:id', (req, res) => {
    Quote.findByIdAndUpdate(
        req.params.id, 
        req.body, 
        { new: true }, (err, updatedUser) => {
            res.redirect(`/quotes/${req.params.id}`);
    });
});


// =======================================
// CREATE QUOTE - ADD A NEW QUOTE
// =======================================
router.post('/', async (req, res) => {
    try {
        await Quote.create(req.body);
        res.redirect('/quotes');
    } catch (error) {
        console.log(error);
        res.redirect('/quotes/new');
    }
});

// =======================================
// SHOW - SHOW QUOTE
// =======================================
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const quotes = await Quote.find({ createdBy: user._id });
        const preachers = await Preacher.find({ createdBy: user._id });
        res.render('quotes/show', { user, quotes, preachers });
    } catch (error) {
        console.log(error);
        res.redirect('/quotes');
    }
});

// =======================================
// EDIT ROUTE
// =======================================
router.get('/:id/edit', (req, res) => {
    Quote.findById(req.params.id, (err, quote) => {
        res.render('quote/edit', { quote });
    });
});









/*
// =======================================
// CREATE USER - POST
// =======================================/
/*
app.post('/users', (req, res) => {
    User.create(req.body, (error, createdUser) => {
        res.redirect('/users');
    });
});
*/

// =======================================
// SHOW USERS
// =======================================
/*
app.get('/users/:id', (req, res) => {
    User.findById(req.params.id, (error, foundUser) => {
        res.render('show.ejs', {
            user: foundUser
        })
    });
});
*/






/*


router.get('/', async (req, res) => {
    try {
        const authors = await Author.find({});
        res.render('authors/index', { authors });
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});






router.get('/new', (req, res) => {
    res.render('authors/new');
});



router.put('/:id', (req, res) => {
    Author.findByIdAndUpdate(
        req.params.id, 
        req.body, 
        { new: true }, (err, updatedAuthor) => {
            res.redirect(`/authors/${req.params.id}`);
    });
});

router.post('/', async (req, res) => {
    try {
        await Author.create(req.body);
        res.redirect('/authors');
    } catch (error) {
        console.log(error);
        res.redirect('/authors/new');
    }
});


router.get('/:id', async (req, res) => {
    try {
        const author = await Author.findById(req.params.id);
        const articles = await Article.find({ createdBy: author._id });
        res.render('authors/show', { author, articles });
    } catch (error) {
        console.log(error);
        res.redirect('/authors');
    }
});


*/

// Exports
module.exports = router;