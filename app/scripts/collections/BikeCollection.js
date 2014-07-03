define([
    'backfire',
    'models/BikeModel'
], function (Backbone, BikeModel) {
    'use strict';

    var BikeCollection = Backbone.Firebase.Collection.extend({
        model: BikeModel
    });

    return BikeCollection;
});
