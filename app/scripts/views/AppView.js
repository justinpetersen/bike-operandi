/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'views/BikeView',
    'jquery.carousel.fullscreen'
], function ($, _, Backbone, JST, BikeView) {
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

            $('#container').children().first().addClass('active');

            this.initCarousel();

            return this;
        },

        initCarousel: function() {
            // TODO: Improve the structure of bootstrap.carousel.fullscreen
            $.carouselFullscreen();
            $('.carousel').carousel({
                pause: "false",
                interval: 4000
            });
            $('#bike-carousel').on('slid.bs.carousel', $.proxy(this.onCarouselSlid, this));
        },

        showHotspots: function(index) {
            console.log('AppView.showHotspots( ' + index + ' )');
            var hotspot = this.bikes.at(index).get('hotspots').at(0);
            console.log(hotspot.get('x') + ', ' + hotspot.get('y'));
        }
    });

    return AppView;
});
