define([
    'templates',
    'marionette'
], function (JST, Marionette) {
    'use strict';

    var HotspotItemView = Marionette.ItemView.extend({
        tagName: 'div',

        attributes: {class: 'hotspot-container'},

        template: JST['app/scripts/templates/Hotspot.ejs'],
    });

    return HotspotItemView;
});