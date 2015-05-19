// Filename: main.js
'use strict';

define([
  'jquery',
  'lodash',
  'backbone',
  'routes/router',
  'views/app'
], function($, _, Backbone, AppRouter, AppView) {

  var initialize = function() {
    var appView = new AppView();

    AppRouter.initialize();

    appView.render();
  };

  return {
    initialize: initialize
  };
});