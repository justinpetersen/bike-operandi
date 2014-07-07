define([
    'jquery',
    'templates',
    'marionette',
    'views/ThumbnailItemView',
    'isotope',
    'imagesloaded',
    'jquery-bridget'
], function ($, JST, Marionette, ThumbnailItemView, Isotope, ImagesLoaded) {
    'use strict';

    var ThumbnailsCompositeView = Marionette.CompositeView.extend({
        itemView: ThumbnailItemView,

        itemViewContainer: '#thumbnails-row-container',

        template: JST['app/scripts/templates/ThumbnailsComposite.ejs'],

        triggers: {
            'click #show-all-button': 'onShowAllClick'
        },

        onSync: function() {
            this.render();
        },

        onRender: function() {
            if (this.collection.length > 0) {
                this.initIsotope();
            }
        },

        onThumbnailClick: function(event) {
            this.trigger('onThumbnailClick', event);
        },

        setFilters: function(filters) {
            var result = $('#thumbnails-row-container').isotope({
                filter: function() {
                    var tags = $(this).find('.tags').text().toLowerCase();
                    var match = true;
                    for (var i=0; i<filters.length; i++) {
                        if (filters[i] != '*' && tags.indexOf(filters[i].toLowerCase()) == -1) {
                            match = false;
                        }
                    }
                    return match;
                }
            });

            this.showNoResultsAlert();
        },

        showNoResultsAlert: function() {
            // TODO: Find a better way to check for no results
            if ($('#thumbnails-row-container').css('height') == '0px') {
                $('#no-results-container').show();
            } else {
                $('#no-results-container').hide();
            }
        },

        initialize: function() {
            $.bridget('isotope', Isotope);
            $('#no-results-container').hide();
            this.listenTo(this.collection, 'sync', this.onSync);
            this.on('itemview:onClick', $.proxy(this.onThumbnailClick, this));
        },

        initIsotope: function() {
            ImagesLoaded($('#thumbnails-row-container'), $.proxy(this.resetIsotope, this));
        },

        resetIsotope: function() {
            $('#thumbnails-row-container').isotope({
                itemSelector: '.thumbnail-container',
                layoutMode: 'fitRows',
                getSortData: {
                    title: '.title'
                }
            });
        }
    });

    return ThumbnailsCompositeView;
});