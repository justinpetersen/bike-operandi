define([
    'backfire',
    'models/BikeFilterModel',
    'firebase'
], function (Backbone, BikeFilterModel, Firebase) {
    'use strict';

    var BikeFilterCollection = Backbone.Firebase.Collection.extend({
        model: BikeFilterModel
    });

    return BikeFilterCollection;
});
