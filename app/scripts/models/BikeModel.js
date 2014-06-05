/*global define*/

define([
    'underscore',
    'backbone'
], function (_, Backbone) {
    'use strict';

    var BikeModel = Backbone.Model.extend({
        defaults: {
            title: '',
            image: '',
            hotspots: []
        },

        initialize: function() {
        },

        validate: function(attrs, options) {
        },

        parse: function(response, options)  {
            return response;
        }
    });

    return BikeModel;
});
