define([
    'templates',
    'marionette'
], function (JST, Marionette) {
    'use strict';

    var BikeHeaderView = Marionette.ItemView.extend({
        template: JST['app/scripts/templates/BikeHeader.ejs'],

        onModelChange: function() {
        	this.render();
        },

        initialize: function() {
            this.listenTo(this.model, 'change', this.onModelChange);
        }
    });

    return BikeHeaderView;
});