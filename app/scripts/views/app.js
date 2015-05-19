// Filename: views/app.js

define([
  'jquery',
  'underscore',
  'backbone',
  'filtered',
  'collections/events',
  'views/events',
  'text!templates/layout.html'
], function($, _, Backbone, FilteredCollection, Events, EventView, layoutTemplate) {
  'use strict';

  /**
   * Whole app view, which generates events list
   *
   * @class AppView
   * @constructor
   */
  var AppView = Backbone.View.extend({
    tagName: 'div',

    events: {
      'change .unpredicted-filter': 'filterAll',
      'click [data-sort]': 'sortBy'
    },

    /**
     * The EventsView listens for changes on Events collection
     *
     * @method initialize
     */
    initialize: function() {
      this.$template = $(layoutTemplate);
      this.$eventsList = $('#events-list', this.$template);

      this.fetchingCallback = function() {
        this.filteredCollection = new FilteredCollection(Events);

        this.addAll();
      };

      //I want fetch data only first time, to keep changes values - just for tests
      if (Events.length === 0) {
        Events.fetch({
          reset: true,
          success: $.proxy(function() {
            this.fetchingCallback();
          }, this)
        });
      } else {
        this.fetchingCallback();
      }
    },

    /**
     * Render app
     *
     * @method render
     * @return {Object} AppView
     */
    render: function() {
      this.$el.html(this.$template);

      return this;
    },

    /**
     * Add event to events list
     *
     * @method addOne
     * @param {Object} event - single item of Events Collection
     */
    addOne: function(event) {
      var eventView = new EventView({model: event});

      this.$eventsList.append(eventView.render().el);
    },

    /**
     * Add all events item by item by addOne method
     *
     * @method addAll
     */
    addAll: function() {
      this.$eventsList.empty();
      this.filteredCollection._collection.each(this.addOne, this);
    },

    /**
     * Show only unpredicted events if checked
     *
     * @method filterAll
     * @param {Object} event - get state of checkbox
     */
    filterAll: function(event) {
      var checked = false;

      if (event && event.currentTarget.checked) {
        checked = true;
      }

      if (checked) {
        this.filteredCollection.filterBy('unpredicted', function(model) {
          return model.get('user_prediction') === null;
        });
      } else {
        this.filteredCollection.removeFilter('unpredicted');
      }

      this.addAll();
    },

    /**
     * Sorting method
     *
     * @method filterAll
     * @param {Object} event - get sorting query
     */
    sortBy: function(event) {
      var $target = $(event.currentTarget),
          query = $target.data('sort'),
          $container = $target.parents('.table');

      $container[0].className = $container[0].className.replace(/\bsortedtype.*?\b/g, '');

      $container.addClass('sortedtype_' + query);

      Events.comparator = query;
      Events.sort();

      this.addAll();
    }
  });

  return AppView;
});