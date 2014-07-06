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
            // KLUDGE: This should be happening on images loaded, but it is currently failing.
            this.resetIsotope();

            var result = $('#parts-row-container').isotope({
                filter: function() {
                    var tags = $(this).find('.part-title').text().toLowerCase();
                    var matchAll = true;
                    for (var i=0; i<filters.length; i++) {
                        var matchAny = false;
                        var subFilters = filters[i].split(',');
                        for (var j=0; j<subFilters.length; j++) {
                            if (tags.indexOf(subFilters[j].toLowerCase()) != -1) {
                                matchAny = true;
                            }
                        }
                        if (filters[i] != '*' && !matchAny) {
                            matchAll = false;
                        }
                    }
                    return matchAll;
                }
            });

            this.showNoResultsAlert();
        },

        resetIsotope: function() {
            $('#parts-row-container').isotope({
                itemSelector: '.part-container',
                layoutMode: 'fitRows',
                getSortData: {
                    title: '.part-title'
                }
            });
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