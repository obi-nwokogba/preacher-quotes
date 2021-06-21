// ===========================
// Dependencies
// ===========================
const router = require('express').Router();
const User = require('../models/user');
const Preacher = require('../models/preacher');
const Quote = require('../models/quote');


const seedData = require('../models/seedData.js');

router.get('/seed', (req, res) => {
    Preacher.deleteMany({}, (error, allPreachers) => {})
    Preacher.create(seedData, (error, data) => {
        res.redirect('/preachers')
    })
})

// Define routes/controllers

router.get('/', async (req, res) => {
    try {
        const preachers = await Preacher.find({});
        res.render('preachers/index.ejs', { preachers });
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
    res.render('preachers/new');
});


// =======================================
// DELETE ROUTE
// =======================================
router.delete('/:id', (req, res) => {
    Preacher.findByIdAndDelete(req.params.id, (err, removedPreacher) => {
        res.redirect('/preachers');
    });
});

// =======================================
// UPDATE ROUTE
// =======================================
router.put('/:id', (req, res) => {
    Preacher.findByIdAndUpdate(
        req.params.id, 
        req.body, 
        { new: true }, (err, updatedPreacher) => {
            res.redirect(`/preachers/${req.params.id}`);
    });
});


// =======================================
// CREATE USER - POST
// =======================================
router.post('/', async (req, res) => {
    try {
        await Preacher.create(req.body);
        res.redirect('/preachers');
    } catch (error) {
        console.log(error);
        res.redirect('/preachers/new');
    }
});

// =======================================
// SHOW - SHOW USERS
// =======================================
router.get('/:id', async (req, res) => {
    try {
        const preacher = await Preacher.findById(req.params.id);
        const quotes = await Quote.find({ createdBy: preacher._id });
        res.render('preachers/show', { preacher, quotes });
    } catch (error) {
        console.log(error);
        res.redirect('/preachers');
    }
});

// =======================================
// EDIT ROUTE
// =======================================
router.get('/:id/edit', (req, res) => {
    Preacher.findById(req.params.id, (err, preacher) => {
        res.render('preachers/edit', { preacher });
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

// Define routes/controllers
/*
// We are mounting this controller on /authors
router.get('/', async (req, res) => {
    try {
        const preachers = await Preacher.find({});
        res.render('preachers/index', { preachers });
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});

router.get('/new', (req, res) => {
    res.render('preachers/new');
});

router.delete('/:id', (req, res) => {
    Preacher.findByIdAndDelete(req.params.id, (err, removedPreacher) => {
        res.redirect('/preachers');
    });
});

router.put('/:id', (req, res) => {
    Preacher.findByIdAndUpdate(
        req.params.id, 
        req.body, 
        { new: true }, (err, updatedPreacher) => {
            res.redirect(`/preachers/${req.params.id}`);
    });
});

router.post('/', async (req, res) => {
    try {
        await Preacher.create(req.body);
        res.redirect('/preachers');
    } catch (error) {
        console.log(error);
        res.redirect('/preachers/new');
    }
});


router.get('/:id', async (req, res) => {
    try {
        const preacher = await Preacher.findById(req.params.id);
        const quotes = await Quote.find({ createdBy: preacher._id });
        res.render('preachers/show', { preacher, quotess });
    } catch (error) {
        console.log(error);
        res.redirect('/preachers');
    }
});

router.get('/:id/edit', (req, res) => {
    Preacher.findById(req.params.id, (err, preacher) => {
        res.render('preachers/edit', { preacher });
    });
});


*/

// Exports
module.exports = router;