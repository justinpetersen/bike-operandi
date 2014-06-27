define([
    'templates',
    'marionette',
], function (JST, Marionette) {
    'use strict';

    var CarouselItemView = Marionette.ItemView.extend({
        tagName: 'div',

        attributes: {class: 'item'},

        template: JST['app/scripts/templates/CarouselItem.ejs'],

		triggers: {
			'click #parts-button': 'onPartsClick',
			'click #hotspots-button': 'onHotspotsClick'
		}
    });

    return CarouselItemView;
});