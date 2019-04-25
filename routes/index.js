// Dependencies

const express = require("express"),
    router = express.Router(),
    db = require("../models");

// populate index handlebars and articles

router.get("/", (req, res) => {
    db.Article
        .find({})
        .then(articles => res.render("index", {article}))
        .catch(err => res.json(err));

});

module.exports = router;