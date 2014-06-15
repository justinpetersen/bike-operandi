define([
    'marionette'
], function (Marionette) {
    'use strict';

    var HotspotsCarouselLayout = Marionette.Layout.extend({
        template: JST['app/scripts/templates/HotspotsCarouselLayout.ejs'],

        attributes: {
            id: 'hotspots-carousel-container'
        },

        regions: {
            carousel: '#carousel-container',
            hotspots: '#hotspots-container'
        }
    });

    return HotspotsCarouselLayout;
});