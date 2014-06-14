define([
    'jquery',
    'templates',
    'marionette',
    'views/ThumbnailItemView'
], function ($, JST, Marionette, ThumbnailItemView) {
    'use strict';

    var ThumbnailsCompositeView = Marionette.CompositeView.extend({
        tagName: 'div',

        itemView: ThumbnailItemView,

        itemViewContainer: '#thumbnails-row-container',

        template: JST['app/scripts/templates/ThumbnailsComposite.ejs']
    });

    return ThumbnailsCompositeView;
});