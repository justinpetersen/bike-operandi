define([
    'marionette'
], function (Marionette) {
    'use strict';

    var BikeApplicationLayout = Marionette.Layout.extend({
        template: JST['app/scripts/templates/BikeApplicationLayout.ejs'],

        attributes: {
            id: 'hotspots-carousel-container'
        },

        regions: {
            carousel: '#carousel-container',
            hotspots: '#hotspots-container'
        }
    });

    return BikeApplicationLayout;
});