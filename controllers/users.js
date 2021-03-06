// ===========================
// Dependencies
// ===========================
const router = require('express').Router();
const User = require('../models/user');
const Quote = require('../models/quote');
const Preacher = require('../models/preacher');
const bcrypt = require('bcrypt');
// Define routes/controllers

// We are mounting this controller on /users

router.get('/', async (req, res) => {
    try {
        const users = await User.find({});
        res.render('users/index', { users });
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});

// =======================================
// NEW USER PAGE
// Chose /signup instead of be user/new
// =======================================
router.get('/new', (req, res) => {
    res.render('users/new');
});


// =======================================
// DELETE ROUTE
// =======================================
router.delete('/:id', (req, res) => {
    User.findByIdAndDelete(req.params.id, (err, removedUser) => {
        res.redirect('/users');
    });
});

// =======================================
// UPDATE ROUTE
// =======================================
router.put('/:id', (req, res) => {
    User.findByIdAndUpdate(
        req.params.id, 
        req.body, 
        { new: true }, (err, updatedUser) => {
            res.redirect(`/users/${req.params.id}`);
    });
});


// =======================================
// CREATE USER - POST
// =======================================
router.post('/', async (req, res) => {
    try {
        req.body.hashedpassword = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
        await User.create(req.body);
        res.redirect('/users');
    } catch (error) {
        console.log(error);
        res.redirect('/users/new');
    }
});

// =======================================
// SHOW - SHOW USERS
// =======================================
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const quotes = await Quote.find({ createdBy: user._id });
        res.render('users/show', { user, quotes });
    } catch (error) {
        console.log(error);
        res.redirect('/users');
    }
});

// =======================================
// EDIT ROUTE
// =======================================
router.get('/:id/edit', (req, res) => {
    User.findById(req.params.id, (err, user) => {
        res.render('users/edit', { user });
    });
});









/*
// =======================================
// CREATE USER - POST
// =======================================
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