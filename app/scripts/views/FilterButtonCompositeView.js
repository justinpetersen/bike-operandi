define([
    'marionette',
    'views/FilterButtonListItemView'
], function (Marionette, FilterButtonListItemView) {
    'use strict';

    var FilterButtonCompositeView = Marionette.CompositeView.extend({

        itemView: FilterButtonListItemView,

        itemViewContainer: 'ul',

        template: JST['app/scripts/templates/FilterButtonComposite.ejs'],

        events: {
            'click .btn': 'onFilterClick'
        },

        onFilterClick: function(event) {
            // TODO: Use the BikeFilterModel or a button ID to access filter value instead of textContent
            var filter = event.currentTarget.textContent;
            this.trigger('onFilterClick', [filter]);
        },

        onRender: function() {
            // Get rid of the wrapping-div.
            // Assumes 1 child element present in template.
            this.$el = this.$el.children();
            // Unwrap the element to prevent infinitely nesting elements during re-render.
            this.$el.unwrap();
            this.setElement(this.$el);
        },

        initialize: function() {
            this.collection = this.model.children;
        }
    });

    return FilterButtonCompositeView;
});