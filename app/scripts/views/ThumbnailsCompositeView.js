define([
    'jquery',
    'templates',
    'marionette',
    'views/ThumbnailItemView',
    'isotope'
], function ($, JST, Marionette, ThumbnailItemView, Isotope) {
    'use strict';

    var ThumbnailsCompositeView = Marionette.CompositeView.extend({
        tagName: 'div',

        itemView: ThumbnailItemView,

        itemViewContainer: '#thumbnails-row-container',

        template: JST['app/scripts/templates/ThumbnailsComposite.ejs'],

        onSync: function() {
            this.render();
        },

        onRender: function() {
            if (this.collection.length > 0) {
                var iso = new Isotope('#thumbnails-row-container', {
                    itemSelector: '.thumbnail-container',
                    layoutMode: 'fitRows',
                    getSortData: {
                        title: '.title'
                    },
                    sortBy: 'title'
                });
            }
        },

        initialize: function() {
            this.listenTo(this.collection, 'sync', this.onSync);
        }
    });

    return ThumbnailsCompositeView;
});