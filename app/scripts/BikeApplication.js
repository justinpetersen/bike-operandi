define([
    'marionette',
    'collections/BikeCollection',
    'collections/BikeFilterCollection',
    'views/CarouselCompositeView',
    'views/HotspotsCollectionView',
    'views/layout/HotspotsCarouselLayout',
    'views/PartsModalCompositeView',
    'views/layout/BikeDetailLayout',
    'views/layout/ThumbnailFiltersLayout',
    'views/FilterButtonCollectionView',
    'views/ThumbnailsCompositeView'
], function (Marionette, BikeCollection, BikeFilterCollection, CarouselCompositeView, HotspotsCollectionView, HotspotsCarouselLayout, PartsModalCompositeView, BikeDetailLayout, ThumbnailFiltersLayout, FilterButtonCollectionView, ThumbnailsCompositeView) {
    'use strict';

    var BikeApplication = Marionette.Application.extend({
        bikeCollection: null,

        bikeFilterCollection: null,

        hotspotsCarouselLayout: null,

        carouselCompositeView: null,

        hotspotsCollectionView: null,

        partsModalCompositeView: null,

        bikeDetailLayout: null,

        thumbnailFiltersLayout: null,

        filterButtonCollectionView: null,

        thumbnailsCompositeView: null,

        hotspotsOn: true,

        onSync: function() {
            this.showHotspots(0);
        },

        onCarouselSlide: function(index) {
            this.hotspotsCarouselLayout.hotspots.close();
        },

        onCarouselSlid: function(index) {
            if (this.hotspotsOn) {
                this.showHotspots(index);
            }
        },

        onSelectedFiltersChanged: function() {
            this.thumbnailsCompositeView.setFilters(this.bikeFilterCollection.selectedFilters);
        },

        onPopoverShown: function() {
            this.carouselCompositeView.pauseCarousel();
        },

        onPartsClick: function(itemView) {
            this.showPartsModal(itemView.model);
        },

        onHotspotsClick: function() {
            this.toggleHotspots();
        },

        onModalHidden: function() {
            this.carouselCompositeView.resumeCarousel();
        },

        onThumbnailClick: function(itemView) {
            this.showBikeDetailLayout(itemView.model);
        },

        onShowAllClick: function() {
            this.clearFilters();
            return false;
        },

        initialize: function() {
            this.addRegions({
                modal: '#modal-container',
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
            var RootBikeCollection = BikeCollection.extend({ firebase: 'https://bike-operandi.firebaseio.com/bikes' });
            this.bikeCollection = new RootBikeCollection();
            var RootBikeFilterCollection = BikeFilterCollection.extend({ firebase: 'https://bike-operandi.firebaseio.com/filters' });
            this.bikeFilterCollection = new RootBikeFilterCollection();
        },

        initViews: function() {
            this.initPartsModal();
            this.initBikeDetailLayout();
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

        initPartsModal: function() {
            this.partsModalCompositeView = new PartsModalCompositeView();
        },

        initBikeDetailLayout: function() {
            this.bikeDetailLayout = new BikeDetailLayout();
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
            this.listenTo(this.hotspotsCollectionView, 'onPopoverShown', this.onPopoverShown);
            this.listenTo(this.hotspotsCollectionView, 'onPopoverHidden', this.onPopoverHidden);
            this.listenTo(this.carouselCompositeView, 'onPartsClick', this.onPartsClick);
            this.listenTo(this.carouselCompositeView, 'onHotspotsClick', this.onHotspotsClick);
            this.listenTo(this.partsModalCompositeView, 'onModalHidden', this.onModalHidden);
            this.listenTo(this.filterButtonCollectionView, 'onSelectedFiltersChanged', this.onSelectedFiltersChanged);
            this.listenTo(this.thumbnailsCompositeView, 'onThumbnailClick', this.onThumbnailClick);
            this.listenTo(this.thumbnailsCompositeView, 'onShowAllClick', this.onShowAllClick);
        },

        showHotspots: function(index) {
            this.hotspotsCarouselLayout.hotspots.show(this.hotspotsCollectionView);
            this.hotspotsCollectionView.collection = this.bikeCollection.at(index).get('hotspots');
            this.hotspotsCollectionView.render();
        },

        showPartsModal: function(model) {
            this.modal.show(this.partsModalCompositeView);
            this.partsModalCompositeView.collection = model.get('hotspots');
            this.partsModalCompositeView.render();
            this.partsModalCompositeView.showModal();
            this.carouselCompositeView.pauseCarousel();
        },

        showBikeDetailLayout: function(model) {
            this.modal.show(this.bikeDetailLayout);
            this.bikeDetailLayout.showModal(model);
        },

        toggleHotspots: function() {
            if (this.hotspotsOn) {
                this.hotspotsCarouselLayout.hotspots.close();
                this.hotspotsOn = false;
            } else {
                this.showHotspots(this.carouselCompositeView.getActiveIndex());
                this.hotspotsOn = true;
            }
        },

        clearFilters: function() {
            this.filterButtonCollectionView.clearSelectedFilters();
            this.thumbnailsCompositeView.setFilters(['*']);
        }
    });

    var application = new BikeApplication();
    application.initialize();

    return application;
});