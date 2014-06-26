define([
    'templates',
    'marionette'
], function (JST, Marionette) {
    'use strict';

    var FilterButtonListItemView = Marionette.ItemView.extend({
        attributes: {
        	'class': 'filter-btn'
        },

        tagName: 'li',

        template: JST['app/scripts/templates/FilterButtonListItem.ejs'],

        events: {
            'click a': 'onFilterListItemClick'
        },

        initialize: function() {
        	if (this.model.get('label') == '-') {
        		this.$el.addClass('divider');
        	}
        },

        onFilterListItemClick: function(event) {
        	event.preventDefault();
            this.trigger('onFilterListItemClick');
        }
    });

    return FilterButtonListItemView;
});