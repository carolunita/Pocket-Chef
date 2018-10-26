// Initializes Node.js packages
var path = require("path");
var bodyParser = require("body-parser");
var express = require("express");

var publicPath = path.join(__dirname, "client/public");

// Initializes Express.js server and defines port
var app = express();
var port = process.env.PORT || 3001;

// Initializes Sequelize models
var db = require("./models");

// Sets up data parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Loads static files
app.use(express.static(publicPath));

// Imports routes
require("./routes/user-routes.js")(app);
require("./routes/api-routes.js")(app);

app.get("*", (req, res) => {
  res.sendFile(path.join(publicPath, "index.html"))
})

// Starts Express.js server
db.sequelize.sync().then(function() {
  app.listen(port, function() {
    console.log("🌎 ==> App listening on PORT " + port);
  });
});