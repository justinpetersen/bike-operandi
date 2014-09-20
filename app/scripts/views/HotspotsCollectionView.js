define([
    'jquery',
    'marionette',
    'views/HotspotItemView',
    'jquery-ui'
], function ($, Marionette, HotspotItemView) {
    'use strict';

    var HotspotsCollectionView = Marionette.CollectionView.extend({
        itemView: HotspotItemView,

        targetImage: null,

        onRender: function() {
            this.updateHotspotPositions();
        },

        onClick: function(eventData) {
            var hotspotPosition = this.getHotspotPositionRatio(eventData.clientX, eventData.clientY);
        },

        onPopoverShown: function() {
            this.trigger('onPopoverShown');
        },

        onPopoverHidden: function() {
            this.trigger('onPopoverHidden');
        },

        onResize: function(eventData) {
            this.updateHotspotPositions();
        },

        onDragStop: function(itemView) {
            var position = this.getHotspotPositionRatio(itemView.$el.position().left + 16, itemView.$el.position().top + 16);
            itemView.model.set('x', position.left);
            itemView.model.set('y', position.top);

            if (position.left < 0 || position.left > 1 || position.top < 0 || position.top > 1) {
                this.trigger('onDragOutside', itemView);
            }
        },

        showHotspots: function(collection) {
            // TODO: There is probably a better way to reset the collection and trigger a render
            this.collection = collection;
            this.listenTo(this.collection, 'add', this.render);
            this.listenTo(this.collection, 'remove', this.render);
            this.render();
            this.fadeInHotspots();
        },

        setTargetImage: function(image) {
            this.targetImage = image;

            this.updateHotspotPositions();
        },

        initialize: function() {
            $(window).on('click', $.proxy(this.onClick, this));
            $(window).on('resize', $.proxy(this.onResize, this));
        },

        updateHotspotPositions: function() {
            var that = this;
            this.children.each(function(itemView) {
                var hotspotPosition = that.getHotspotPosition(itemView.model.get('x'), itemView.model.get('y'));
                hotspotPosition.left = hotspotPosition.left - 16;
                hotspotPosition.top = hotspotPosition.top - 16;
                itemView.$el.css(hotspotPosition);

                if (that.getUrlVars()['edit']) {
                    that.initDraggable(itemView);
                }

                that.addPopover(itemView);
            });
        },

        fadeInHotspots: function() {
            var that = this;
            var i = 0;
            this.children.each(function(itemView) {
                itemView.$el.hide();
                itemView.$el.fadeIn(400);
                i++;
            });
        },

        addPopover: function(itemView) {
            var hotspotPosition = this.getHotspotPosition(itemView.model.get('x'), itemView.model.get('y'));
            var options = {
                title: itemView.model.get('title'),
                // TODO: Move the popover HTML to a template
                content: '<div class="popover-image-container"><img class="popover-image" src="' + itemView.model.get('image') + '"></div>',
                html: true,
                placement: this.getPopoverPlacement(hotspotPosition.left, hotspotPosition.top),
                trigger: 'hover'
            };
            // TODO: Remove use of id
            var popover = $('#' + itemView.model.get('id')).popover(options);
            popover.on('shown.bs.popover', $.proxy(this.onPopoverShown, this));
            popover.on('hidden.bs.popover', $.proxy(this.onPopoverHidden, this));
        },

        initDraggable: function(itemView) {
            itemView.$el.draggable( { stop: $.proxy(this.onDragStop, this, itemView) } );

            // KLUDGE: This is necessary to fix the hotspot positions
            itemView.$el.css('position', 'absolute');
        },

        getPopoverPlacement: function(x, y) {
            var placement = y > $(window).outerHeight() / 2 ? 'top' : 'bottom';
            if (x < $(window).outerWidth() / 2) {
                placement = 'right';
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
            // KLUDGE: There is probably a more elegant way to access these dimensions.
            var clientWidth = $('#hero-container').width();
            var clientHeight = $('#hero-container').height();
            if (this.targetImage != null) {
                clientWidth = this.targetImage.width();
                clientHeight = this.targetImage.height();
            }

            var nativeImageWidth = 1118;
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
        },

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

    return HotspotsCollectionView;
});