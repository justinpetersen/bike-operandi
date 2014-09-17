define([
    'templates',
    'marionette',
], function (JST, Marionette) {
    'use strict';

    var ThumbnailItemView = Marionette.ItemView.extend({
        tagName: 'div',

        attributes: { 'class': 'btn thumbnail-container col-lg-4 col-sm-6 col-xs-6' },

        template: JST['app/scripts/templates/ThumbnailItem.ejs'],

        triggers: {
            'click': 'onClick'
        }
    });

    return ThumbnailItemView;
});