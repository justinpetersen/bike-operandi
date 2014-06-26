define([
    'marionette',
    'views/FilterButtonCompositeView',
    'views/FilterButtonItemView'
], function (Marionette, FilterButtonCompositeView, FilterButtonItemView) {
    'use strict';

    var FilterButtonCollectionView = Marionette.CollectionView.extend({

        attributes: { 'class': 'btn-group' },

        itemView: FilterButtonCompositeView,

        nodeItemView: FilterButtonItemView,

        // events: {
        //     'click .filter-btn': 'onFilterClick'
        // },

        onSelectedChanged: function(event) {
            this.updateSelectedFilters();
        },

        initialize: function() {
            this.on('itemview:onSelectedChanged', $.proxy(this.onSelectedChanged, this));
        },

        getItemView: function(item) {
            var view = item.children ? this.itemView : this.nodeItemView;
            return view;
        },

        updateSelectedFilters: function() {
            this.collection.clearSelectedFilters();

            var that = this;
            this.children.each(function(itemView) {
                that.collection.addSelectedFilter(itemView.model.selected);
            });

            this.trigger('onSelectedFiltersChanged');
        }
    });

    return FilterButtonCollectionView;
});