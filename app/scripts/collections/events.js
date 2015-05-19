define([
    'underscore',
    'backbone',
    'models/event'
], function(_, Backbone, Event) {
    'use strict';

    var EventsCollection = Backbone.Collection.extend({
        //Reference to this collection's model
        model: Event,

        url: 'http://localhost:9000/data/data.json',

        unpredicted: function() {
            return this.where({'user_prediction': null})
        },

        // Events are sorted by their id
        comparator: 'id'
    });

    return new EventsCollection();
});