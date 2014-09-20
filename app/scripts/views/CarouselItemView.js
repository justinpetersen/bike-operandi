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
            'click #hotspots-button': 'onHotspotsClick',
            'click #edit-bike-button': 'onEditClick'
		},

        onRender: function() {
            if (this.getUrlVars()['edit']) {
                this.showEditBikeButton();
            }
        },

        onModelChange: function() {
            // TODO: Render the bike on model change. This is currently attaching a second bike image.
            // this.render();
        },

        initialize: function() {
            this.listenTo(this.model, 'change', this.onModelChange);
        },

        showEditBikeButton: function() {
            this.$el.find('#edit-bike-button').show();
        },

        // TODO: Move this to router
        getUrlVars: function() {
            var vars = [], hash;
            var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
            for (var i = 0; i < hashes.length; i++)
            {
                hash = hashes[i].split('=');
                vars.push(hash[0]);
                vars[hash[0]] = hash[1];
            }
            return vars;
        }
    });

    return CarouselItemView;
});