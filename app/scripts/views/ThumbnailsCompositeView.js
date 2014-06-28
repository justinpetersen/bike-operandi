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

        setFilters: function(filters) {
            $('#thumbnails-row-container').isotope({
                filter: function() {
                    var tags = $(this).find('.tags').text();
                    var match = true;
                    for (var i=0; i<filters.length; i++) {
                        if (filters[i] != '*' && tags.indexOf(filters[i]) == -1) {
                            match = false
                        }
                    }
                    return match;
                }
            });
        },

        initialize: function() {
            $.bridget('isotope', Isotope);
            this.listenTo(this.collection, 'sync', this.onSync);
        },

        initIsotope: function() {
            var container = $('#thumbnails-row-container');
            container.imagesLoaded(function() {
                container.isotope({
                    itemSelector: '.thumbnail-container',
                    layoutMode: 'fitRows',
                    getSortData: {
                        title: '.title'
                    }
                });
            });
        }
    });

    return ThumbnailsCompositeView;
});