define([
    'marionette'
], function (Marionette) {
    'use strict';

    var ThumbnailFiltersLayout = Marionette.Layout.extend({
        template: JST['app/scripts/templates/ThumbnailFiltersLayout.ejs'],

        regions: {
            filters: '#filters-container',
            thumbnails: '#thumbnails-container'
        }
    });

    return ThumbnailFiltersLayout;
});