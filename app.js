var express         = require('express'),
    morgan          = require('morgan'),
    path            = require('path'),
    mongoose        = require('mongoose'),
    bodyParser      = require('body-parser'),
    cookieParser    = require('cookie-parser'),
    app             = express(),
    //routers
    ejs             = require("ejs"),
    compress        = require('compression');

  require('dontenv').config();

  // 
