// Filename: routes/router.js

define([
  'jquery',
  'underscore',
  'backbone',
  'views/app',
  'views/event',
  'collections/events'
], function($, _, Backbone, AppView, EventView, Events) {
  'use strict';

  /**
   * Managing routes
   *
   * @class AppRouter
   * @constructor
   */
  var AppRouter = Backbone.Router.extend({
    routes: {
      '': 'eventsList',
      'event/:id': 'showEvent'
    }
  });

  /**
   * Trigger behaviour depending on routes
   *
   * @method initialize
   */
  var initialize = function() {
    var appRouter = new AppRouter();

    appRouter.on('route:showEvent', function(id) {

      //as on views/app.js fetching data is in conditional just for test, to keep changes values
      var fetchingCallback = function(data) {
        var eventView = new EventView({model: data.get(id)});

        $('.container').html(eventView.render().el);
      };

      if (Events.length === 0) {
        Events.fetch({
          success: fetchingCallback
        });
      } else {
        fetchingCallback(Events);
      }

    });

    appRouter.on('route:eventsList', function() {
      var appView = new AppView();

      $('.container').html(appView.render().el);
    });

    Backbone.history.start();
  };

  return {
    initialize: initialize
  };
});