define([
    'jquery',
    'marionette',
    'views/FilterButtonListItemView'
], function ($, Marionette, FilterButtonListItemView) {
    'use strict';

    var FilterButtonCompositeView = Marionette.CompositeView.extend({

        itemView: FilterButtonListItemView,

        itemViewContainer: 'ul',

        template: JST['app/scripts/templates/FilterButtonComposite.ejs'],

        onRender: function() {
            // Get rid of the wrapping-div.
            // Assumes 1 child element present in template.
            this.$el = this.$el.children();
            // Unwrap the element to prevent infinitely nesting elements during re-render.
            this.$el.unwrap();
            this.setElement(this.$el);
        },

        onFilterClick: function(event) {
            this.setSelected(event.model.get('label'));
        },

        initialize: function() {
            this.collection = this.model.children;
            this.on('itemview:onFilterClick', $.proxy(this.onFilterClick, this));
        },

        setSelected: function(selected) {
            this.model.selected = selected;
            this.$el.find('.btn:first-child').html(selected + ' <span class="caret"></span>');
            this.trigger('onSelectedChanged');
        }
    });

    return FilterButtonCompositeView;
});