// Filename: main.js
'use strict';

// Require.js allows us to configure shortcut alias
require.config({
  paths: {
    jquery: '../bower_components/jquery/dist/jquery',
    underscore: '../bower_components/underscore/underscore',
    backbone: '../bower_components/backbone/backbone',
    filtered: '../bower_components/backbone-filtered-collection/backbone-filtered-collection',
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