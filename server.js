//Dependencies
const express = require('express'),
      mongoose = require('mongoose'),
      exphbs = require('express-handlebars'),
      bodyParser = require('body-parser'),
      logger = require('morgan'),
      path = require('path'),

//  Initialize app
const app = express();

// Db setup
const config = require("./config/database");
mongoose.Promise = Promise;
mongoose
.connect(config.database)
.then( result => {
  console.log(`Connected to database '${result.connections[0].name}' on ${result.connections[0].host}:${result.connections[0].port}`);
})
.catch(err => console.log("Error no connect:", err));

app.use(favicon(path.join(__dirname, "public", "assets/img/favicon.ico")));

app.use(logger("dev"));

//setting up body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//setting up handlebars middleware
app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");

//setting up the static directory
app.use(express.static(path.join(__dirname, "public")));
app.use("/articles",express.static(path.join(__dirname, "public")));
app.use("/notes",express.static(path.join(__dirname, "public")));


//setting up routes
const index = require("./routes/index"),
      article = require("./routes/articles"),
      notes = require("./routes/notes"),
      scrape = require("./routes/scrape");

app.use("/", index);
app.use("/articles", articles);
app.use("/notes", notes);
app.use("/scrape", scrape);

// Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
  console.log(`Listening on http://localhost:${PORT}`);
});