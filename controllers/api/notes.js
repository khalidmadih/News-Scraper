'use strict';

// Requiring Packages and files
const express = require('express'),
      router = express.Router(),
      request = require('request'),
      cheerio = require('cheerio'),
      Article = require('../../models/article'),
      Note = require('../../models/note');

// Route to get all the notes
router.get('/', function(req, res) {
    Note
        .find({})
        .exec(function(err, notes) {
            if (err) {
                console.log(err);
                res.status(500);
            } else {
                res.status(200).json(notes);
            }
        });
});

// route to add a note to a saved article
router.post('/:id', function(req, res) {
    let newNote = new Note(req.body);
    newNote.save(function(err, doc) {
        if (err) {
            console.log(err);
            res.status(500);
        } else {
            Article.findOneAndUpdate(
                { _id: req.params.id },
                { $push: { 'notes': doc.id } },
                function(error, newDoc) {
                    if (error) {
                        console.log(error);
                        res.status(500);
                    } else {
                        res.redirect('/saved');
                    }
                }
            );
        }
    });
});

// Route to delete a note from a saved article
router.delete('/:id', function(req, res) {
    Note.findByIdAndRemove(req.params.id, function(err, note) {
        if (err) {
            console.log(err);
            res.status(500);
        } else {
            res.redirect('/saved');
        }
    });
});

// Exporting note routes
module.exports = router;
