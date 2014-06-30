define([
    'templates',
    'marionette'
], function (JST, Marionette) {
    'use strict';

    var PartListItemView = Marionette.ItemView.extend({
        tagName: 'div',

        attributes: { 'class': 'part-container part-container-sm col-lg-3 col-sm-4 col-xs-12' },

        template: JST['app/scripts/templates/PartListItem.ejs']
    });

    return PartListItemView;
});