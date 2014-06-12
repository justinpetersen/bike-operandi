define([
    'marionette'
], function (Marionette) {
    'use strict';

    var HotspotItemView = Marionette.ItemView.extend({
        tagName: 'div',

        attributes: {class: 'hotspot-holder'},

        template: JST['app/scripts/templates/Hotspot.ejs'],
    });

    var HotspotsCollectionView = Marionette.CollectionView.extend({
        itemView: HotspotItemView,

        onRender: function() {
            this.updateHotspotPositions();
        },

        updateHotspotPositions: function() {
            var that = this;
            this.children.each(function(itemView) {
                var hotspotPosition = that.getHotspotPosition(itemView.model.get('x'), itemView.model.get('y'));
                hotspotPosition.left = hotspotPosition.left - 16;
                hotspotPosition.top = hotspotPosition.top - 16;
                itemView.$el.css(hotspotPosition);

                that.addPopover(itemView)
            });
        },

        addPopover: function(itemView) {
            var hotspotPosition = this.getHotspotPosition(itemView.model.get('x'), itemView.model.get('y'));
            var options = {
                title: itemView.model.get('title'),
                content: '<img src="' + itemView.model.get('image') + '" width="160">',
                html: true,
                placement: this.getPopoverPlacement(hotspotPosition.left, hotspotPosition.top),
                trigger: 'hover'
            };
            $('#' + itemView.model.get('id')).popover(options);
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

    return HotspotsCollectionView;
});