define([
    'backfire',
    'models/BikeFilterModel',
    'firebase'
], function (Backbone, BikeFilterModel, Firebase) {
    'use strict';

    var BikeFilterCollection = Backbone.Firebase.Collection.extend({
        model: BikeFilterModel,

        // TODO: Externalize Firebase URL
    	firebase: new Firebase('https://bike-operandi.firebaseio.com/filters')
    });

    return BikeFilterCollection;
});
