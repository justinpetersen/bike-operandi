define([
    'templates',
    'marionette'
], function (JST, Marionette) {
    'use strict';

    var NavButtonItemView = Marionette.ItemView.extend({
        tagName: 'li',

        template: JST['app/scripts/templates/NavButton.ejs'],

        onRender: function() {
            if (this.model.get('active')) {
            	this.$el.addClass('active');
            }
        }
    });

    return NavButtonItemView;
});