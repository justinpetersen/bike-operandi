define([
    'templates',
    'marionette',
], function (JST, Marionette) {
    'use strict';

    var ThumbnailItemView = Marionette.ItemView.extend({
        tagName: 'div',

        attributes: { 'class': 'thumbnail-container col-lg-4 col-sm-6 col-xs-12' },

        template: JST['app/scripts/templates/ThumbnailItem.ejs']
    });

    return ThumbnailItemView;
});