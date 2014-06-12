define([
    'marionette',
    'collections/BikeCollection',
    'views/BikesView'
], function (Marionette, BikeCollection, BikesCompositeView) {
    'use strict';

    var BikeApplicationLayout = Marionette.Layout.extend({
        template: JST['app/scripts/templates/BikeApplicationLayout.ejs'],

        regions: {
            carousel: '#carousel-holder',
            hotspots: '#hotspots-holder'
        }
    });

    return BikeApplicationLayout;
});