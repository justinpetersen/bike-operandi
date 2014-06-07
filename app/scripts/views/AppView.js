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

        initialize: function(bikes) {
            this.bikes = bikes;
            this.listenTo(this.bikes, 'sync', this.onSync);
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
                interval: 4000
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
            var x = hotspotModel.get('x') * document.documentElement.clientWidth;
            var y = hotspotModel.get('y') * document.documentElement.clientHeight;
            $('#' + hotspotModel.get('id')).css({left: x, top: y});
        }
    });

    return AppView;
});
