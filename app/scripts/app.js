// Filename: app.js
'use strict';

/**
 * First view and routing are triggered
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