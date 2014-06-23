define([
    'templates',
    'marionette'
], function (JST, Marionette) {
    'use strict';

    var FilterButtonListItemView = Marionette.ItemView.extend({
        tagName: 'li',

        template: JST['app/scripts/templates/FilterButtonListItem.ejs']
    });

    return FilterButtonListItemView;
});