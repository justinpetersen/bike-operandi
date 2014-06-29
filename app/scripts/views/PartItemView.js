define([
    'templates',
    'marionette'
], function (JST, Marionette) {
    'use strict';

    var PartItemView = Marionette.ItemView.extend({
        tagName: 'div',

        attributes: { 'class': 'part-container col-lg-4 col-sm-6 col-xs-12' },

        template: JST['app/scripts/templates/PartItem.ejs']
    });

    return PartItemView;
});