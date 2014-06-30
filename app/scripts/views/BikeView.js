define([
    'templates',
    'marionette'
], function (JST, Marionette) {
    'use strict';

    var BikeView = Marionette.ItemView.extend({
        template: JST['app/scripts/templates/Bike.ejs']
    });

    return BikeView;
});