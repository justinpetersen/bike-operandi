define([
    'templates',
    'marionette'
], function (JST, Marionette) {
    'use strict';

    var NavButtonItemView = Marionette.ItemView.extend({
        tagName: 'li',

        template: JST['app/scripts/templates/NavButton.ejs'],

        triggers: {
            'click': 'onClick'
        },

        onModelChange: function() {
            this.render();
        },

        onRender: function() {
            if (this.model.get('active')) {
            	this.$el.addClass('active');
            } else {
                this.$el.removeClass('active');
            }
        },

        initialize: function() {
            this.listenTo(this.model, 'change', this.onModelChange);
        },
    });

    return NavButtonItemView;
});