/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'views/BikeView',
    'models/HotspotModel',
    'views/HotspotView',
    'jquery.carousel.fullscreen'
], function ($, _, Backbone, JST, BikeView, HotspotModel, HotspotView) {
    'use strict';

    var AppView = Backbone.View.extend({
        // template: JST['app/scripts/templates/App.ejs'],

        tagName: 'div',

        id: '',

        className: '',

        events: {},

        bikes: [],

        onSync: function() {
            this.render();
        },

        onCarouselSlide: function() {
            this.clearHotspots();
        },

        onCarouselSlid: function() {
            var activeIndex = $('.carousel').data('bs.carousel').getActiveIndex();
            this.showHotspots(activeIndex);
        },

        onWindowResize: function() {
            var activeIndex = $('.carousel').data('bs.carousel').getActiveIndex();
            this.showHotspots(activeIndex);
        },

        onClick: function(eventData) {
            var hotspotPosition = this.getHotspotPositionRatio(eventData.clientX, eventData.clientY);
            console.log(hotspotPosition.left + ', ' + hotspotPosition.top);
        },

        initialize: function(bikes) {
            this.bikes = bikes;
            this.listenTo(this.bikes, 'sync', this.onSync);
            $(window).on('resize', $.proxy(this.onWindowResize, this));
            $(window).on('click', $.proxy(this.onClick, this));
        },

        render: function() {
            for (var i=0; i<this.bikes.length; i++) {
                var bike = new BikeView({ model: this.bikes.at(i) });
                var item = $('#container').append(bike.render().el);
            }

            this.initCarousel();
            this.showHotspots(0);

            return this;
        },

        initCarousel: function() {
            // Make the first slide active
            $('#container').children().first().addClass('active');

            // TODO: Improve the structure of bootstrap.carousel.fullscreen
            $.carouselFullscreen();
            $('.carousel').carousel({
                pause: "false",
                interval: 40000
            });

            $('#bike-carousel').on('slide.bs.carousel', $.proxy(this.onCarouselSlide, this));
            $('#bike-carousel').on('slid.bs.carousel', $.proxy(this.onCarouselSlid, this));
        },

        showHotspots: function(index) {
            this.clearHotspots();
            
            for (var i=0; i<this.bikes.at(index).get('hotspots').length; i++) {
                var hotspotModel = this.bikes.at(index).get('hotspots').at(i);
                this.createHotspot(hotspotModel);
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
            $('#' + hotspotModel.get('id')).popover({
                title: hotspotModel.get('title'),
                content: '<img src="' + hotspotModel.get('image') + '" width="100">',
                html: true,
                placement: hotspotModel.get('x') > .5 ? 'left' : 'right',
                trigger: 'hover'
            });
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
            // Set browser and image dimensions
            var clientWidth = document.documentElement.clientWidth;
            var clientHeight = document.documentElement.clientHeight;
            var nativeImageWidth = 1118
            var nativeImageHeight = 629;

            // Calculate browser and image ratios
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

    return AppView;
});
