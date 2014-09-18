define([
    'templates',
    'marionette'
], function (JST, Marionette) {
    'use strict';

    var ButtonItemView = Marionette.ItemView.extend({
        tagName: 'button',

        attributes: {
            'type': 'button',
            'class': 'btn btn-primary btn-xs'
        },

        template: JST['app/scripts/templates/Button.ejs'],

        triggers: {
            'click': 'onClick'
        }
    });

    return ButtonItemView;
});