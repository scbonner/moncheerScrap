// Dependenies

const express = require("express"),
    router = express.Router(),
    db = required("../models"
    );

    // Get route to update and save boolean to true

    router.get("/save/:id", (req, res) => {
        db.Article
            .upate({_id: req.params.id}, {saved: true})
            .then(result => res.redirect("/"))
            .catch(err => res.json(err));


    });

// Render, populate and save articles
router.get("/viewSaved", (req, res) => {
    db.Article
        .find({})
        .then(result => res.render("savedArticle", {article:result}))
        .catch(err => res.json(err));

});

// Delete to remove article from savedArticle
router.delete("/deleteArticle/:id", function(req, res){
    db.Article
        .remove({_id: req.params.id})
        .then(result => res.json(result))
        .catch(err => res.json(err));

});

module.exports = router;