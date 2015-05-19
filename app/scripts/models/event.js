define([
    'underscore',
    'backbone'
], function(_, Backbone) {
    'use strict';

    var Event = Backbone.Model.extend({
        //Default data for event model - each data will be visible on table
        default: {
            'summary': 'no name',
            'competition': 'friendly',
            'location': 'World',
            'start_time': null,
            'end_time': null,
            'prediction_count': 0,
            'prediction_options': [],
            'user_prediction': null
        },

        setPrediction: function(id) {
            this.save({
                'user_prediction': id ? id : null
            });
            console.log(this.get('user_prediction'));
        }
    });

    return Event;
});