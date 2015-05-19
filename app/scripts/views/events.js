define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/events.html'
], function($, _, Backbone, eventsTemplate) {
  'use strict';

  var EventsView = Backbone.View.extend({
    tagName: 'tr',

    className: 'events-row',

    template: _.template(eventsTemplate),

    // The DOM events specific to an item
    events: {
      'click .unpredict': 'removePrediction',
      'click td': 'showEvent'
    },

    // The EventsView listens for changes to its model
    initialize: function() {
      this.listenTo(this.model, 'change', this.render);
    },

    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      this.$el.toggleClass('success', this.model.get('user_prediction') !== null);

      return this;
    },

    /**
     * @method
     * @param {Obj} event
     */
    removePrediction: function(event) {
      this.model.setPrediction(null);

      event.stopPropagation();
    },

    showEvent: function() {
      Backbone.history.navigate('event/' + this.model.get('id'),{trigger:true, replace: true});
    }
  });

  return EventsView;
});