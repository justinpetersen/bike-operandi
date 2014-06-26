define([
    'templates',
    'marionette'
], function (JST, Marionette) {
    'use strict';

    var FilterButtonItemView = Marionette.ItemView.extend({
        tagName: 'button',

        attributes: {
        	'type': 'button',
        	'class': 'btn btn-default btn-lg filter-btn'
        },

        template: JST['app/scripts/templates/FilterButton.ejs'],

        events: {
            'click': 'onFilterButtonClick'
        },

        onFilterButtonClick: function(event) {
            event.preventDefault();
            this.trigger('onFilterButtonClick');
        }
    });

    return FilterButtonItemView;
});