// Filename: collections/events.js

define([
    'underscore',
    'backbone',
    'models/event'
], function(_, Backbone, Event) {
    'use strict';

    /**
     * Events collection
     *
     * @class EventsCollection
     * @constructor
     */
    var EventsCollection = Backbone.Collection.extend({
        //Reference to this collection's model
        model: Event,

        url: 'http://localhost:9000/data/data.json',

        // Events are sorted by their id
        comparator: 'id',

        /**
         * Filter by user_prediction parameter
         *
         * @method unpredicted
         */
        unpredicted: function() {
            return this.where({'user_prediction': null});
        }
    });

    return new EventsCollection();
});