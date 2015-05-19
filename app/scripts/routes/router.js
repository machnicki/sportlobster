// Filename: router.js
define([
  'jquery',
  'underscore',
  'backbone',
  'views/app',
  'views/event',
  'collections/events',
  'common'
], function($, _, Backbone, AppView, EventView, Events, Common) {
  'use strict';

  var AppRouter = Backbone.Router.extend({
    routes: {
      'list': 'eventsList',
      'event/:id': 'showEvent',
      '*filter': 'setFilter'
    }
  });

  var initialize = function() {
    var appRouter = new AppRouter();

    appRouter.on('route:showEvent', function(id) {
      Events.fetch({
        success: function(data) {
          var eventView = new EventView({model: data.get(id)});

          eventView.render();
        }
      });
    });

    appRouter.on('route:setFilter', function(param) {
      // Setting the current filter
      Common.EventsFilter = param || '';

      Events.trigger('filter', param);
    });

    appRouter.on('route:eventsList', function() {
      var appView = new AppView();

      appView.render();
    });

    Backbone.history.start();
  };

  return {
    initialize: initialize
  };
});