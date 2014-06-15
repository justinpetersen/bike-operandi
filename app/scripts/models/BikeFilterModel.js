define([
    'backbone'
], function (Backbone) {
    'use strict';

    var BikeFilterModel = Backbone.Model.extend({
        defaults: {
            label: ''
        }
    });

    return BikeFilterModel;
});
