const express = require("express");
const path           = require('path');
const logger         = require('morgan');
const bodyParser     = require('body-parser');
const passport 			 = require("./config/passport");
const session        = require('express-session'); 
const config				 = require("./config/extra-config");

const mongoose = require("mongoose");
const routes = require("./routes");
const app = express();


// Enable CORS from client-side
app.use(function(req, res, next) {  
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
const authCheck = require('./config/middleware/attachAuthenticationStatus');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

app.use(session({ secret: config.sessionKey, resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(authCheck);

const PORT = process.env.PORT || 3001;

// Define middleware here
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
// Add routes, both API and view
app.use(routes);

// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb+srv://user1:Pa55w0rd@cluster0.ay0lz.mongodb.net/react-portfolio?retryWrites=true&w=majority");

// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
