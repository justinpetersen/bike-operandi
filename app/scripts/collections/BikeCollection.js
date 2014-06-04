/*global define*/

define([
    'underscore',
    'backfire',
    'models/BikeModel',
    'firebase'
], function (_, Backbone, BikeModel, Firebase) {
    'use strict';

    var BikeCollection = Backbone.Firebase.Collection.extend({
        model: BikeModel,

        // TODO: Externalize Firebase URL
    	firebase: new Firebase('https://bike-operandi.firebaseio.com/bikes')
    });

    return BikeCollection;
});
