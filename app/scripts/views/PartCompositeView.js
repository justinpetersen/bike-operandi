define([
    'jquery',
    'templates',
    'marionette',
    'views/PartItemView',
    'isotope',
    'imagesloaded',
    'jquery-bridget'
], function ($, JST, Marionette, PartItemView, Isotope, ImagesLoaded) {
    'use strict';

    var PartCompositeView = Marionette.CompositeView.extend({
        itemView: PartItemView,

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

        onAddChild: function(childView) {
            $('#parts-row-container').isotope('prepended', childView.$el);
        },

        onDeleteClick: function(itemView) {
            this.collection.remove(itemView.model);
        },

        onRemoveChild: function(childView) {
            $('#parts-row-container').isotope('layout');
        },

        setFilters: function(filters) {
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
            $('#no-results-container').hide();
            this.listenTo(this.collection, 'sync', this.onSync);
            this.on('after:item:added', $.proxy(this.onAddChild, this));
            this.on('itemview:onDeleteClick', $.proxy(this.onDeleteClick, this));
            this.on('item:removed', $.proxy(this.onRemoveChild, this));
        },

        initIsotope: function() {
            ImagesLoaded($('#parts-row-container'), $.proxy(this.resetIsotope, this));
        },

        resetIsotope: function() {
            $('#parts-row-container').isotope({
                itemSelector: '.part-container',
                layoutMode: 'fitRows',
                getSortData: {
                    title: '.part-title'
                }
            });
        }
    });

    return PartCompositeView;
});