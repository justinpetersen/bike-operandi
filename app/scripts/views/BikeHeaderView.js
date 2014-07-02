define([
    'templates',
    'marionette'
], function (JST, Marionette) {
    'use strict';

    var BikeHeaderView = Marionette.ItemView.extend({
        template: JST['app/scripts/templates/BikeHeader.ejs']
    });

    return BikeHeaderView;
});