define([
    'jquery',
    'templates',
    'marionette',
    'views/CarouselItemView',
    'bootstrap'
], function ($, JST, Marionette, CarouselItemView) {
    'use strict';

    var CarouselCompositeView = Marionette.CompositeView.extend({
        tagName: 'div',

        attributes: {
            id: 'bike-carousel',
            class: 'carousel slide'
        },

        itemView: CarouselItemView,

        itemViewContainer: '#container',

        template: JST['app/scripts/templates/CarouselComposite.ejs'],

        onSync: function() {
            this.render();
        },

        onRender: function() {
            this.initCarousel();
        },

        onCarouselSlide: function() {
            this.trigger('onCarouselSlide', [$('.carousel').data('bs.carousel').getActiveIndex()]);
        },

        onCarouselSlid: function() {
            this.trigger('onCarouselSlid', [$('.carousel').data('bs.carousel').getActiveIndex()]);
        },

        initialize: function() {
            this.listenTo(this.collection, 'sync', this.onSync);
        },

        initCarousel: function() {
            // Make the first slide active
            $('#container').children().first().addClass('active');

            this.carouselFullscreen();

            $('.carousel').carousel({
                pause: 'hover',
                interval: 4000
            });

            $('#bike-carousel').on('slide.bs.carousel', $.proxy(this.onCarouselSlide, this));
            $('#bike-carousel').on('slid.bs.carousel', $.proxy(this.onCarouselSlid, this));
        },

        carouselFullscreen: function() {
            $('.carousel-inner div.item img').each(function() {
                var imgSrc = $(this).attr('src');
                $(this).parent().css({ 'background-image': 'url(' + imgSrc + ')' });
                $(this).remove();
            });
        }
    });

    return CarouselCompositeView;
});