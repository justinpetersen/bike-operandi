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

        initialize: function(bikes) {
            this.bikes = bikes;
            this.listenTo(this.bikes, 'sync', this.onSync);
            $(window).on('resize', $.proxy(this.onWindowResize, this));
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
            hotspotPosition.x = hotspotPosition.x - 16;
            hotspotPosition.y = hotspotPosition.y - 16;
            $('#' + hotspotModel.get('id')).css(hotspotPosition);
            $('#' + hotspotModel.get('id')).tooltip({
                title: hotspotModel.get('title') + '<img src="' + hotspotModel.get('image') + '" width="60">',
                html: true,
                placement: hotspotModel.get('x') > .5 ? 'left' : 'right'
            })
        },

        getHotspotPosition: function(x, y) {
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

            // Determine hotspot x, y within the browser viewport. At first assume that the image and browser are the exact same ratio.
            var left = x * scaledImageWidth;
            var top = y * scaledImageHeight;

            // Adjust the scaled image dimensions and hotspot images in the case that the image and browser are different ratios.
            if (clientRatio < imageRatio) {
                scaledImageWidth = clientHeight * imageRatio;
                left = x * scaledImageWidth - ((scaledImageWidth - clientWidth) / 2);
            } else if (clientRatio > imageRatio) {
                scaledImageHeight = clientWidth / imageRatio;
                top = y * scaledImageHeight - ((scaledImageHeight - clientHeight) / 2);
            }

            var position = {
                left: left,
                top: top
            }

            return position;
        }
    });

    return AppView;
});
