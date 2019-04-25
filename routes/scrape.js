//Dependencies
const express = require("express"), 
    cherrio = require("cheerio"),
    rp = require("request-promise"),  
    router = express.Router(),
    db = require("../models");


router.get("/newArticle", function(req, res) {
    const choices = {
        url: https://www.npr.org/,
        transform: function (body) {
            return cheerio.load(body);

        }
    };
    // Call db and return saved articles
    db.Article
        .find({})
        .then(saveArticle) => {
            var saveTitles = saveArticle.map(article => article.title);
            rp(choices)
            .then(function ($) {
                var newArtArray = [];
                $('#latest-panel article.story.theme-summary').each((i, element) => {
                    var newArticle = new db.Article({
                      storyUrl: $(element).find('.story-body>.story-link').attr('href'),
                      imgUrl  : $(element).find('img').attr('src'),
                      summary : $(element).find('p.summary').text().trim(),            
            });
                    if (newArticle.storyUrl) {

                        if(!saveTitles.includes(newArticle.title)) {
                            newArtArray.push(newArticle);

        }
    }
 });
     // Adding new articles to db
    db.Article
        .create(newArtArray)
        .then(result => res.json({count: newArtArray.length}))  
        .catch(err => {});

    })
    .catch(err => console.log(err));
     })

 .catch(err => console.log(err));     // End request to scrape

});
module.exports = router;


}