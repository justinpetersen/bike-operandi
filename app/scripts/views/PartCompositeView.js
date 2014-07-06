define([
    'jquery',
    'templates',
    'marionette',
    'views/PartListItemView',
    'isotope',
    'imagesloaded',
    'jquery-bridget'
], function ($, JST, Marionette, PartListItemView, Isotope, ImagesLoaded) {
    'use strict';

    var PartCompositeView = Marionette.CompositeView.extend({
        itemView: PartListItemView,

        itemViewContainer: '#parts-row-container',

        template: JST['app/scripts/templates/PartComposite.ejs'],

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

        setFilters: function(filters) {
            var result = $('#parts-row-container').isotope({
                filter: function() {
                    var tags = $(this).find('.part-title').text();
                    var match = true;
                    for (var i=0; i<filters.length; i++) {
                        if (filters[i] != '*' && tags.indexOf(filters[i]) == -1) {
                            match = false
                        }
                    }
                    console.log(match);
                    return match;
                }
            });

            this.showNoResultsAlert();
        },

        showNoResultsAlert: function() {
            // TODO: Find a better way to check for no results
            if ($('#parts-row-container').css('height') == '0px') {
                $('#no-results-container').show();
            } else {
                $('#no-results-container').hide();
            }
        },

        initialize: function() {
            $.bridget('isotope', Isotope);
            $.bridget('imagesLoaded', ImagesLoaded);
            $('#no-results-container').hide();
            this.listenTo(this.collection, 'sync', this.onSync);
        },

        initIsotope: function() {
            var container = $('#parts-row-container');
            container.imagesLoaded(function() {
                container.isotope({
                    itemSelector: '.part-container',
                    layoutMode: 'fitRows',
                    getSortData: {
                        title: '.part-title'
                    }
                });
            });
        }
    });

    return PartCompositeView;
});