define([
    'templates',
    'marionette'
], function (JST, Marionette) {
    'use strict';

    var BikeView = Marionette.ItemView.extend({
        template: JST['app/scripts/templates/Bike.ejs'],

        onModelChange: function() {
        	this.render();
        },

        initialize: function() {
        	this.listenTo(this.model, 'change', this.onModelChange);
        },
    });

    return BikeView;
});