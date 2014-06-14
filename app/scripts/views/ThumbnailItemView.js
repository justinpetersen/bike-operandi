define([
    'templates',
    'marionette',
], function (JST, Marionette) {
    'use strict';

    var ThumbnailItemView = Marionette.ItemView.extend({
        tagName: 'div',

        template: JST['app/scripts/templates/ThumbnailItem.ejs'],
    });

    return ThumbnailItemView;
});