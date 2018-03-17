'use strict';

// Requiring Packages and files
const express = require('express'),
      router = express.Router(),
      Article = require('../models/article');

// Setting the default route
router.get('/', function(req, res) {
    Article
        .find({})
        .where('saved').equals(false)
        .where('deleted').equals(false)
        .sort('-date')
        .limit(20)
        .exec(function(error, articles) {
            if (error) {
                console.log(error);
                res.status(500);
            } else {
                console.log(articles);
                let hbsObj = {
                    title: 'My Awsome News Scrapper',
                    subtitle: 'All the new you need in one place',
                    articles: articles
                };
                res.render('index', hbsObj);
            }
        });
});

// Route for Saved Articles
router.get('/saved', function(req, res) {
    Article
        .find({})
        .where('saved').equals(true)
        .where('deleted').equals(false)
        .populate('notes')
        .sort('-date')
        .exec(function(error, articles) {
            if (error) {
                console.log(error);
                res.status(500);
            } else {
                console.log(articles);
                let hbsObj = {
                    title: 'My Awsome News Scrapper',
                    subtitle: 'All the new you need in one place',
                    articles: articles
                };
                res.render('saved', hbsObj);
            }
        });
});

// require controllers
router.use('/api', require('./api'));

// Exporting the routes
module.exports = router;
