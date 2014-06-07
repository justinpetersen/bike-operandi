/*global define*/

define([
    'underscore',
    'backbone'
], function (_, Backbone) {
    'use strict';

    var HotspotModel = Backbone.Model.extend({
        defaults: {
            x: 0,
            y: 0
        },

        initialize: function() {
        },

        validate: function(attrs, options) {
        },

        parse: function(response, options)  {
            return response;
        }
    });

    return HotspotModel;
});
