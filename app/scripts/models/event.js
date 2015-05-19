// Filename: models/event.js

define([
    'underscore',
    'backbone'
], function(_, Backbone) {
    'use strict';

  /**
   * Events model
   *
   * @class Event
   * @constructor
   */
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

        /**
         * Set new user_prediction value or remove
         *
         * @method setPrediction
         * @param {Integer} id - when undefined, prediction will be removed
         */
        setPrediction: function(id) {
            this.save({ //instead of save
                'user_prediction': id ? id : null
            });
        }
    });

    return Event;
});