define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/event.html'
], function($, _, Backbone, eventTemplate) {
  'use strict';

  var EventView = Backbone.View.extend({
    el: '.container',

    template: _.template(eventTemplate),

    // The DOM events specific to an item
    events: {
      'click .predict': 'setPrediction',
      'click .unpredict': 'removePrediction',
      'click .back-to-list': 'backToList'
    },

    // The EventsView listens for changes to its model
    initialize: function() {
      this.listenTo(this.model, 'change', this.render);
    },

    render: function() {
      this.$el.html(this.template(this.model.toJSON()));

      return this;
    },

    /**
     * Set user prediction or remove
     * @method
     * @param {Obj} event - ID comes from DOM attr (clicked element)
     */
    setPrediction: function(event) {
      var id = $(event.currentTarget).data('id') || null;

      this.model.setPrediction(id);

      event.stopPropagation();
    },

    /**
     * @method
     * @param {Obj} event
     */
    removePrediction: function() {
      this.model.setPrediction(null);
    },

    backToList: function() {
      Backbone.history.navigate('list',{trigger:true, replace: true});
    }
  });

  return EventView;
});