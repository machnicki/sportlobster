// Filename: views/events.js

define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/events.html'
], function($, _, Backbone, eventsTemplate) {
  'use strict';

  /**
   * Events list item view
   *
   * @class EventsView
   * @constructor
   */
  var EventsView = Backbone.View.extend({
    tagName: 'tr',

    className: 'events-row',

    template: _.template(eventsTemplate),

    // The DOM events specific to an item
    events: {
      'click .unpredict': 'removePrediction',
      'click td': 'showEvent'
    },

    /**
     * The EventsView listens for changes to its model
     *
     * @method initialize
     */
    initialize: function() {
      this.listenTo(this.model, 'change', this.render);
    },

    /**
     * Render event list item
     *
     * @method render
     * @return {Object} EventsView
     */
    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      this.$el.toggleClass('success', this.model.get('user_prediction') !== null);

      return this;
    },

    /**
     * @method removePrediction
     * @param {Object} event - use to stop propagation
     */
    removePrediction: function(event) {
      this.model.setPrediction(null);

      event.stopPropagation();
    },

    /**
     * Go to new event view (id from model)
     *
     * @method showEvent
     */
    showEvent: function() {
      Backbone.history.navigate('event/' + this.model.get('id'),{trigger:true, replace: true});
    }
  });

  return EventsView;
});