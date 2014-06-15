define([
    'jquery',
    'templates',
    'marionette',
    'views/ThumbnailItemView',
    'isotope',
    'jquery-bridget'
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
                this.initIsotope();
            }
        },

        initialize: function() {
            $.bridget('isotope', Isotope);
            this.listenTo(this.collection, 'sync', this.onSync);
        },

        initIsotope: function() {
            $('#thumbnails-row-container').isotope({
                itemSelector: '.thumbnail-container',
                layoutMode: 'fitRows',
                getSortData: {
                    title: '.title'
                }
            });

            $('#thumbnails-row-container').isotope({
                sortBy: 'title'
            });
        }
    });

    return ThumbnailsCompositeView;
});