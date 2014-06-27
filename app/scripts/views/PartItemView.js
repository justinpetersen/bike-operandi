define([
    'templates',
    'marionette'
], function (JST, Marionette) {
    'use strict';

    var PartItemView = Marionette.ItemView.extend({
        tagName: 'tr',

        template: JST['app/scripts/templates/Part.ejs']
    });

    return PartItemView;
});