define([
    'templates',
    'marionette'
], function (JST, Marionette) {
    'use strict';

    var FilterButtonItemView = Marionette.ItemView.extend({
        tagName: 'button',

        attributes: {
        	'type': 'button',
        	'class': 'btn btn-default filter-btn'
        },

        template: JST['app/scripts/templates/FilterButton.ejs'],

        events: {
            'click .filter-btn': 'onFilterClick'
        },

        onFilterClick: function(event) {
            console.log('label: ' + this.model.get('label'));
            return false;
        }
    });

    return FilterButtonItemView;
});