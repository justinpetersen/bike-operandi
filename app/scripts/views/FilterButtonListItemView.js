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
            'click a': 'onFilterClick'
        },

        onFilterClick: function(event) {
        	event.preventDefault();
            this.trigger('onFilterClick');
        }
    });

    return FilterButtonListItemView;
});