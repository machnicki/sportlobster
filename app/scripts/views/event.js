// Filename: views/event.js

define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/event.html'
], function($, _, Backbone, eventTemplate) {
  'use strict';

  /**
   * Single event view
   *
   * @class EventView
   * @constructor
   */
  var EventView = Backbone.View.extend({
    tagName: 'div',

    template: _.template(eventTemplate),

    // The DOM events specific to an item
    events: {
      'click .predict': 'setPrediction',
      'click .unpredict': 'removePrediction',
      'click .back-to-list': 'backToList'
    },

    /**
     * The EventView listens for changes to its model
     *
     * @method initialize
     */
    initialize: function() {
      this.listenTo(this.model, 'change', this.render);
    },

    /**
     * Render event single view
     *
     * @method render
     * @return {Object} EventView
     */
    render: function() {
      this.$el.empty();
      this.$el.html(this.template(this.model.toJSON()));

      return this;
    },

    /**
     * Set user prediction
     *
     * @method setPrediction
     * @param {Obj} event - ID comes from DOM attr (clicked element)
     */
    setPrediction: function(event) {
      var id = $(event.currentTarget).data('id') || null;

      this.model.setPrediction(id);

      event.stopPropagation();
    },

    /**
     * @method removePrediction
     * @param {Object} event
     */
    removePrediction: function(event) {
      this.model.setPrediction(null);

      event.stopPropagation();
    },

    /**
     * Go to events list view
     *
     * @method backToList
     */
    backToList: function() {
      Backbone.history.navigate('',{trigger:true, replace: true});
    }
  });

  return EventView;
});