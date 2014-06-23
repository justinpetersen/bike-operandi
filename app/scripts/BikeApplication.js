define([
    'marionette',
    'collections/BikeCollection',
    'collections/BikeFilterCollection',
    'views/CarouselCompositeView',
    'views/HotspotsCollectionView',
    'views/layout/HotspotsCarouselLayout',
    'views/layout/ThumbnailFiltersLayout',
    'views/FilterButtonCollectionView',
    'views/ThumbnailsCompositeView'
], function (Marionette, BikeCollection, BikeFilterCollection, CarouselCompositeView, HotspotsCollectionView, HotspotsCarouselLayout, ThumbnailFiltersLayout, FilterButtonCollectionView, ThumbnailsCompositeView) {
    'use strict';

    var BikeApplication = Marionette.Application.extend({
        bikeCollection: null,

        bikeFilterCollection: null,

        hotspotsCarouselLayout: null,

        carouselCompositeView: null,

        hotspotsCollectionView: null,

        thumbnailFiltersLayout: null,

        filterButtonCollectionView: null,

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

        onFilterClick: function(filter) {
            this.thumbnailsCompositeView.setFilter(filter);
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
            var RootBikeFilterCollection = BikeFilterCollection.extend({ firebase: 'https://bike-operandi.firebaseio.com/filters' });
            this.bikeFilterCollection = new RootBikeFilterCollection();
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
            this.thumbnailFiltersLayout = new ThumbnailFiltersLayout();
            this.thumbnailFiltersLayout.render();
            this.content.show(this.thumbnailFiltersLayout);

            this.filterButtonCollectionView = new FilterButtonCollectionView({ collection: this.bikeFilterCollection });
            this.thumbnailFiltersLayout.filters.show(this.filterButtonCollectionView);

            this.thumbnailsCompositeView = new ThumbnailsCompositeView({ collection: this.bikeCollection });
            this.thumbnailFiltersLayout.thumbnails.show(this.thumbnailsCompositeView);
        },

        initEvents: function() {
            this.listenTo(this.bikeCollection, 'sync', this.onSync);
            this.listenTo(this.carouselCompositeView, 'onCarouselSlide', this.onCarouselSlide);
            this.listenTo(this.carouselCompositeView, 'onCarouselSlid', this.onCarouselSlid);
            this.listenTo(this.filterButtonCollectionView, 'onFilterClick', this.onFilterClick);
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