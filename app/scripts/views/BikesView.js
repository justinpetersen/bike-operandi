define([
    'marionette'
], function (Marionette) {
    'use strict';

    var BikeItemView = Marionette.ItemView.extend({
        tagName: 'div',

        attributes: {class: 'item'},

        template: JST['app/scripts/templates/Bike.ejs'],
    });

    var BikesCompositeView = Marionette.CompositeView.extend({
        tagName: 'div',

        attributes: {
            id: 'bike-carousel',
            class: 'carousel slide'
        },

        itemView: BikeItemView,

        itemViewContainer: '#container',

        template: JST['app/scripts/templates/Bikes.ejs'],

        onSync: function() {
            this.render();
        },

        onRender: function() {
            this.initCarousel();
        },

        initialize: function() {
            this.listenTo(this.collection, 'sync', this.onSync);
        },

        initCarousel: function() {
            // Make the first slide active
            $('#container').children().first().addClass('active');

            $.carouselFullscreen();
            $('.carousel').carousel({
                pause: "false",
                interval: 40000
            });

            // $('#bike-carousel').on('slide.bs.carousel', $.proxy(this.onCarouselSlide, this));
            // $('#bike-carousel').on('slid.bs.carousel', $.proxy(this.onCarouselSlid, this));
        }
    });

    return BikesCompositeView;
});