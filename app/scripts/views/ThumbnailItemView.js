define([
    'templates',
    'marionette',
], function (JST, Marionette) {
    'use strict';

    var ThumbnailItemView = Marionette.ItemView.extend({
        tagName: 'div',

        attributes: { "class": "thumbnail-container col-lg-3 col-sm-4 col-xs-6" },

        template: JST['app/scripts/templates/ThumbnailItem.ejs']
    });

    return ThumbnailItemView;
});