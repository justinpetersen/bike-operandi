define([
    'templates',
    'marionette',
], function (JST, Marionette) {
    'use strict';

    var CarouselItemView = Marionette.ItemView.extend({
        tagName: 'div',

        attributes: {class: 'item'},

        template: JST['app/scripts/templates/CarouselItem.ejs'],
    });

    return CarouselItemView;
});