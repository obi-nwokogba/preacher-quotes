// Dependencies
const router = require('express').Router();
const Preacher = require('../models/preacher');
const Quote = require('../models/quote');
// Define routes/controllers

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

// Exports
module.exports = router;