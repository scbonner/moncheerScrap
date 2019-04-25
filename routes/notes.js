//Dependencies
const express = require('express'),
      router = express.Router(),
      db = require("../models");


// Get route to retrieve notes from article
router.get("/getNotes/:id", function (req, res) {
    db.Article
        .findOne({_id: req.params.id})
        .populate("notes")
        .then(result => res.json(result))
        .catch(err => res.json(err));

});
router.get("/getSingleNote/:id", function (req, res) {
    db.Note
        .findOne({_id: req.params.id})
        .then(result => res.json(result))
        .catch(err => res.json(err));

});

router.post("/createNote", function (req, res) {
    var { title, body, articleId } = req.body;
    var note = {
        title,
        body
    };
db.Note
    .create(note)
    .then (result => {
        db.Article
            .findOneAndUpdate({_id: articleID}, {$push:{notes: result_id}}, {new:true} )
            .then(data => res.json(result))
            .catch(err => res.json(err));


    })
    router.post("/deleteNote", (req, res) => {
        var {articleId, noteId} = req.body;
        db.Note
        .remove({_id: noteId})
        .then(result => res.json(result))
        .catch(err => res.json(err));
    });

})
module.exports = router;
