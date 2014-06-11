/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'views/BikeView',
    'views/HotspotCompositeView',
    'jquery.carousel.fullscreen'
], function ($, _, Backbone, JST, BikeView, HotspotCompositeView) {
    'use strict';

    var AppView = Backbone.View.extend({
        // template: JST['app/scripts/templates/App.ejs'],

        tagName: 'div',

        id: '',

        className: '',

        events: {},

        bikeCollection: null,

        hotspotCompositeView: null,

        onSync: function() {
            this.render();
        },

        onCarouselSlide: function() {
            this.hotspotCompositeView.clearHotspots();
        },

        onCarouselSlid: function() {
            this.showHotspots();
        },

        onWindowResize: function() {
            this.showHotspots();
        },

        initialize: function(bikes) {
            this.bikeCollection = bikes;
            this.hotspotCompositeView = new HotspotCompositeView();

            this.listenTo(this.bikeCollection, 'sync', this.onSync);
            $(window).on('resize', $.proxy(this.onWindowResize, this));
        },

        render: function() {
            for (var i=0; i<this.bikeCollection.length; i++) {
                var bike = new BikeView({ model: this.bikeCollection.at(i) });
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
            var activeIndex = $('.carousel').data('bs.carousel').getActiveIndex();
            this.hotspotCompositeView.showHotspots(this.bikeCollection.at(activeIndex).get('hotspots'));
        }
    });

    return AppView;
});
