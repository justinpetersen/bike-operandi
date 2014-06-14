define([
    'marionette',
    'collections/BikeCollection',
    'views/CarouselCompositeView',
    'views/HotspotsCollectionView',
    'views/layout/HotspotsCarouselLayout',
    'views/ThumbnailsCompositeView'
], function (Marionette, BikeCollection, CarouselCompositeView, HotspotsCollectionView, HotspotsCarouselLayout, ThumbnailsCompositeView) {
    'use strict';

    var BikeApplication = Marionette.Application.extend({
        bikeCollection: null,

        hotspotsCarouselLayout: null,

        carouselCompositeView: null,

        hotspotsCollectionView: null,

        thumbnailsCompositeView: null,

        onSync: function() {
            this.showHotspots(0);
        },

        onCarouselSlide: function(index) {
            this.hotspotsCarouselLayout.hotspots.close();
        },

        onCarouselSlid: function(index) {
            this.showHotspots(index);
        },

        initialize: function() {
            this.addRegions({
                main: '#main-container',
                content: '#content-container'
            });

            this.addInitializer(function(options){
                this.initCollections();
                this.initViews();
                this.initEvents();
            });
        },

        initCollections: function() {
            this.bikeCollection = new BikeCollection();
        },

        initViews: function() {
            this.initHotspotCarousel();
            this.initThumbnails();
        },

        initHotspotCarousel: function() {
            this.hotspotsCarouselLayout = new HotspotsCarouselLayout();
            this.hotspotsCarouselLayout.render();

            this.main.show(this.hotspotsCarouselLayout);

            this.carouselCompositeView = new CarouselCompositeView({ collection: this.bikeCollection });
            this.hotspotsCarouselLayout.carousel.show(this.carouselCompositeView);

            this.hotspotsCollectionView = new HotspotsCollectionView();
            this.hotspotsCarouselLayout.hotspots.show(this.hotspotsCollectionView);
        },

        initThumbnails: function() {
            this.thumbnailsCompositeView = new ThumbnailsCompositeView({ collection: this.bikeCollection });
            this.content.show(this.thumbnailsCompositeView);
        },

        initEvents: function() {
            this.listenTo(this.bikeCollection, 'sync', this.onSync);
            this.listenTo(this.carouselCompositeView, 'onCarouselSlide', this.onCarouselSlide);
            this.listenTo(this.carouselCompositeView, 'onCarouselSlid', this.onCarouselSlid);
        },

        showHotspots: function(index) {
            var activeIndex = $('.carousel').data('bs.carousel').getActiveIndex();
            var activeBikeModel = this.bikeCollection.at(activeIndex);
            if (activeBikeModel) {
                this.hotspotsCarouselLayout.hotspots.show(this.hotspotsCollectionView);
                this.hotspotsCollectionView.collection = activeBikeModel.get('hotspots');
                this.hotspotsCollectionView.render();
            }
        }
    });

    var application = new BikeApplication();
    application.initialize();

    return application;
});