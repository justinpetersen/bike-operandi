define([
    'templates',
    'marionette'
], function (JST, Marionette) {
    'use strict';

    var FilterButtonItemView = Marionette.ItemView.extend({
        tagName: 'button',

        attributes: {
        	'type': 'button',
        	'class': 'btn btn-default'
        },

        template: JST['app/scripts/templates/FilterButton.ejs'],
    });

    return FilterButtonItemView;
});