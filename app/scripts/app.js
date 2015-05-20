// Filename: app.js
'use strict';

/**
 * Routing is triggered
 *
 * @class App
 * @constructor
 */
define([
  'routes/router'
], function(AppRouter) {

  var initialize = function() {
    AppRouter.initialize();
  };

  return {
    initialize: initialize
  };
});