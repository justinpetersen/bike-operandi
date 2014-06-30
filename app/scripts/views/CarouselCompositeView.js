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
            this.trigger('onCarouselSlide', [this.getActiveIndex()]);
        },

        onCarouselSlid: function() {
            this.trigger('onCarouselSlid', [this.getActiveIndex()]);
        },

        onPartsClick: function(itemView) {
            this.trigger('onPartsClick', itemView);
        },

        onHotspotsClick: function() {
            this.trigger('onHotspotsClick');
        },

        pauseCarousel: function() {
            $('.carousel').carousel('pause');
        },

        resumeCarousel: function() {
            $('.carousel').carousel('cycle');
        },

        getActiveIndex: function() {
            var activeIndex = $('.carousel').data('bs.carousel').getActiveIndex();
            return activeIndex;
        },

        initialize: function() {
            this.listenTo(this.collection, 'sync', this.onSync);
            this.on('itemview:onPartsClick', $.proxy(this.onPartsClick, this));
            this.on('itemview:onHotspotsClick', $.proxy(this.onHotspotsClick, this));
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