define([
    'underscore',
    'backfire',
    'models/BikeModel',
    'firebase'
], function (_, Backbone, BikeModel, Firebase) {
    'use strict';

    var BikeCollection = Backbone.Firebase.Collection.extend({
        model: BikeModel
    });

    return BikeCollection;
});
