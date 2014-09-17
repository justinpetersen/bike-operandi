define([
    'jquery',
    'marionette',
    'views/PartItemView',
    'isotope',
    'imagesloaded',
    'jquery-bridget'
], function ($, Marionette, PartItemView, Isotope, ImagesLoaded) {
    'use strict';

    var PartsCollectionView = Marionette.CollectionView.extend({
    	itemView: PartItemView,

        onRender: function() {
            console.log('PartsCollectionView.onRender');
            if (this.collection.length > 0) {
                // KLUDGE: This delay is a workaround for the bug of Isotope elements stacking
                setTimeout($.proxy(this.initIsotope, this), 1000);
            }
        },

        onAddChild: function(childView) {
            console.log('PartsCollectionView.onAddChild');
            this.$el.isotope('prepended', childView.$el);
        },

        onRemoveChild: function(childView) {
            this.$el.isotope('layout');
        },

    	onDeleteClick: function(itemView) {
    		this.collection.remove(itemView.model);
    	},

    	initialize: function() {
            console.log('PartsCollectionView.initialize');
            $.bridget('isotope', Isotope);
            this.on('itemview:onDeleteClick', $.proxy(this.onDeleteClick, this));
            // this.on('after:item:added', $.proxy(this.onAddChild, this));
            this.on('item:removed', $.proxy(this.onRemoveChild, this));
    	},

        fixIsotope: function() {
            console.log('Fix Isotope!');
            this.$el.isotope('layout');
        },

        initIsotope: function() {
            console.log('PartsCollectionView.initIsotope');
            ImagesLoaded(this.$el, $.proxy(this.resetIsotope, this));
        },

        resetIsotope: function() {
            console.log('PartsCollectionView.resetIsotope');
            this.$el.isotope({
                itemSelector: '.part-container',
                layoutMode: 'fitRows',
                getSortData: {
                    title: '.part-title'
                }
            });

            this.on('after:item:added', $.proxy(this.onAddChild, this));
        }
    });

    return PartsCollectionView;
});