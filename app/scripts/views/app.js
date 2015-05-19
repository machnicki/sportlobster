define([
  'jquery',
  'underscore',
  'backbone',
  'collections/events',
  'views/events',
  'text!templates/layout.html'
], function($, _, Backbone, Events, EventView, layoutTemplate) {
  'use strict';

  var AppView = Backbone.View.extend({
    el: '.container',

    template: _.template(layoutTemplate),

    //todo create events object with eg. filters and paginations

    initialize: function() {
      this.$eventsList = this.$('#events-list');
      //this.listenTo(this.model, 'change', this.render);

      this.listenTo(Events, 'reset', this.addAll);
      this.listenTo(Events, 'filter', this.filter);
      //this.listenTo(Events, 'all', _.debounce(this.render, 0));
      Events.fetch({reset: true});
    },

    render: function() {
      //var data = {};
      //var compiledTemplate = _.template( projectListTemplate, data );

      //var predicted = Events.predicted().length,
      //    unpredicted = Events.unpredicted().length;

      this.$el.html(layoutTemplate);
      this.$eventsList = this.$('#events-list');
    },

    /**
     * Add event to events list
     * @method
     * @param {Obj} event - single item of Events Collection
     */
    addOne: function(event) {
      var eventView = new EventView({model: event});
      this.$eventsList.append(eventView.render().el);
    },

    //Add all events item by item by addOne method
    addAll: function() {
      this.$eventsList.empty();
      Events.each(this.addOne, this);
    },

    filter: function(param) {
      this.$eventsList.attr('class', '');
      this.$eventsList.attr('class', 'filter-' + param);
    }
  });

  return AppView;
});