/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'models/HotspotModel',
    'views/HotspotView'
], function ($, _, Backbone, JST, HotspotModel, HotspotView) {
    'use strict';

    var HotspotCompositeView = Backbone.View.extend({
        template: JST['app/scripts/templates/HotspotComposite.ejs'],

        tagName: 'div',

        id: '',

        className: '',

        events: {},

        onClick: function(eventData) {
            var hotspotPosition = this.getHotspotPositionRatio(eventData.clientX, eventData.clientY);
            console.log(hotspotPosition.left + ', ' + hotspotPosition.top);
        },

        initialize: function () {
            // this.listenTo(this.model, 'change', this.render);
            $(window).on('click', $.proxy(this.onClick, this));
        },

        render: function () {
            this.$el.html(this.template(this.model.toJSON()));

            return this;
        },

        showHotspots: function(hotspots) {
            this.clearHotspots();
            
            for (var i=0; i<hotspots.length; i++) {
                this.createHotspot(hotspots.at(i));
            }
        },

        clearHotspots: function() {
            $('#bike-hotspots').empty();
        },

        createHotspot: function(hotspotModel) {
            var hotspotView = new HotspotView({ model: hotspotModel });
            $('#bike-hotspots').append(hotspotView.render().el);

            // Position hotspots
            var hotspotPosition = this.getHotspotPosition(hotspotModel.get('x'), hotspotModel.get('y'));
            hotspotPosition.left = hotspotPosition.left - 16;
            hotspotPosition.top = hotspotPosition.top - 16;
            $('#' + hotspotModel.get('id')).css(hotspotPosition);

            var options = {
                title: hotspotModel.get('title'),
                content: '<img src="' + hotspotModel.get('image') + '" width="160">',
                html: true,
                placement: this.getPopoverPlacement(hotspotPosition.left, hotspotPosition.top),
                trigger: 'hover'
            };
            $('#' + hotspotModel.get('id')).popover(options);
        },

        getPopoverPlacement: function(x, y) {
            var placement = x > document.documentElement.clientWidth / 2 ? 'left' : 'right';
            if (y < 150) {
                placement = 'bottom';
            } else if (y > document.documentElement.clientHeight - 150) {
                placement = 'top';
            }

            return placement;
        },

        getHotspotPositionRatio: function(x, y) {
            var imageData = this.getImageData();
            var position = {
                left: Math.round(100 * (x + imageData.overflowLeft) / imageData.scaledImageWidth) / 100,
                top: Math.round(100 * (y + imageData.overflowTop) / imageData.scaledImageHeight) / 100
            }

            return position;
        },

        getHotspotPosition: function(x, y) {
            var imageData = this.getImageData();
            var position = {
                left: x * imageData.scaledImageWidth - imageData.overflowLeft,
                top: y * imageData.scaledImageHeight - imageData.overflowTop
            }

            return position;
        },

        getImageData: function() {
            // Get browser and image dimensions.
            var clientWidth = document.documentElement.clientWidth;
            var clientHeight = document.documentElement.clientHeight;
            var nativeImageWidth = 1118
            var nativeImageHeight = 629;

            // Calculate browser and image ratios.
            var clientRatio = clientWidth / clientHeight;
            var imageRatio = nativeImageWidth / nativeImageHeight;

            // Determine scaled image dimensions. At first assume that the image and browser are the exact same ratio.
            var scaledImageWidth = clientWidth;
            var scaledImageHeight = clientHeight;

            // Adjust the scaled image dimensions in the case that the image and browser are different ratios.
            if (clientRatio < imageRatio) {
                scaledImageWidth = clientHeight * imageRatio;
            } else if (clientRatio > imageRatio) {
                scaledImageHeight = clientWidth / imageRatio;
            }

            var imageData = {
                clientWidth: clientWidth,
                clientHeight: clientHeight,
                scaledImageWidth: scaledImageWidth,
                scaledImageHeight: scaledImageHeight,
                overflowLeft: (scaledImageWidth - clientWidth) / 2,
                overflowTop: (scaledImageHeight - clientHeight) / 2
            }

            return imageData;
        }
    });

    return HotspotCompositeView;
});
