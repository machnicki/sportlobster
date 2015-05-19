// Filename: main.js
'use strict';

// Require.js allows us to configure shortcut alias
require.config({
  paths: {
    jquery: '../bower_components/jquery/dist/jquery',
    underscore: '../bower_components/underscore/underscore',
    lodash: '../bower_components/lodash/dist/lodash',
    backbone: '../bower_components/backbone/backbone',
    bootstrap: '../bower_components/bootstrap-sass-official/assets/javascripts/bootstrap',
    text: '../bower_components/requirejs-text/text'
  }
});

require([
  // Load our app module and pass it to our definition function
  'app'
], function(App) {
  // The "app" dependency is passed in as "App"
  App.initialize();
});