define([
    'marionette',
    'controllers/BikeManager',
    'views/layout/NavLayout',
    'views/CarouselCompositeView',
    'views/HotspotsCollectionView',
    'views/layout/HotspotsCarouselLayout',
    'views/layout/BikeDetailLayout',
    'views/layout/ThumbnailFiltersLayout',
    'views/FilterButtonCollectionView',
    'views/ThumbnailsCompositeView'
], function (Marionette, BikeManager, NavLayout, CarouselCompositeView, HotspotsCollectionView, HotspotsCarouselLayout, BikeDetailLayout, ThumbnailFiltersLayout, FilterButtonCollectionView, ThumbnailsCompositeView) {
    'use strict';

    var BikeApplication = Marionette.Application.extend({
        bikeManager: null,

        navLayout: null,

        hotspotsCarouselLayout: null,

        carouselCompositeView: null,

        hotspotsCollectionView: null,

        bikeDetailLayout: null,

        thumbnailFiltersLayout: null,

        filterButtonCollectionView: null,

        thumbnailsCompositeView: null,

        hotspotsOn: true,

        onSyncComplete: function() {
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
            this.thumbnailsCompositeView.setFilters(this.bikeManager.bikeFilterCollection.selectedFilters);
        },

        onPopoverShown: function() {
            this.carouselCompositeView.pauseCarousel();
        },

        onPartsClick: function(itemView) {
            this.showBikeDetailLayout(itemView.model, false);
        },

        onHotspotsClick: function() {
            this.toggleHotspots();
        },

        onModalHidden: function() {
            this.carouselCompositeView.resumeCarousel();
        },

        onThumbnailClick: function(itemView) {
            this.showBikeDetailLayout(itemView.model, true);
        },

        onShowAllClick: function() {
            this.clearFilters();
            return false;
        },

        initialize: function() {
            this.addRegions({
                nav: '#nav-container',
                modal: '#modal-container',
                main: '#main-container',
                content: '#content-container'
            });

            this.addInitializer(function(options){
                this.initBikeManager();
                this.initViews();
            });
        },

        initBikeManager: function() {
            this.bikeManager = new BikeManager();
            this.listenTo(this.bikeManager, 'onSyncComplete', this.onSyncComplete);
        },

        initViews: function() {
            this.initNavLayout();
            this.initHotspotCarousel();
            this.initBikeDetailLayout();
            this.initThumbnails();
            this.initViewEvents();
        },

        initNavLayout: function() {
            this.navLayout = new NavLayout();
            this.nav.show(this.navLayout);
            this.navLayout.showNav();
        },

        initHotspotCarousel: function() {
            this.hotspotsCarouselLayout = new HotspotsCarouselLayout();
            this.hotspotsCarouselLayout.render();
            this.main.show(this.hotspotsCarouselLayout);

            this.carouselCompositeView = new CarouselCompositeView({ collection: this.bikeManager.bikeCollection });
            this.hotspotsCarouselLayout.carousel.show(this.carouselCompositeView);

            this.hotspotsCollectionView = new HotspotsCollectionView();
            this.hotspotsCarouselLayout.hotspots.show(this.hotspotsCollectionView);
        },

        initBikeDetailLayout: function() {
            this.bikeDetailLayout = new BikeDetailLayout();
        },

        initThumbnails: function() {
            this.thumbnailFiltersLayout = new ThumbnailFiltersLayout();
            this.thumbnailFiltersLayout.render();
            this.content.show(this.thumbnailFiltersLayout);

            this.filterButtonCollectionView = new FilterButtonCollectionView({ collection: this.bikeManager.bikeFilterCollection });
            this.thumbnailFiltersLayout.filters.show(this.filterButtonCollectionView);

            this.thumbnailsCompositeView = new ThumbnailsCompositeView({ collection: this.bikeManager.bikeCollection });
            this.thumbnailFiltersLayout.thumbnails.show(this.thumbnailsCompositeView);
        },

        initViewEvents: function() {
            this.listenTo(this.carouselCompositeView, 'onCarouselSlide', this.onCarouselSlide);
            this.listenTo(this.carouselCompositeView, 'onCarouselSlid', this.onCarouselSlid);
            this.listenTo(this.hotspotsCollectionView, 'onPopoverShown', this.onPopoverShown);
            this.listenTo(this.hotspotsCollectionView, 'onPopoverHidden', this.onPopoverHidden);
            this.listenTo(this.carouselCompositeView, 'onPartsClick', this.onPartsClick);
            this.listenTo(this.carouselCompositeView, 'onHotspotsClick', this.onHotspotsClick);
            this.listenTo(this.bikeDetailLayout, 'onModalHidden', this.onModalHidden);
            this.listenTo(this.filterButtonCollectionView, 'onSelectedFiltersChanged', this.onSelectedFiltersChanged);
            this.listenTo(this.thumbnailsCompositeView, 'onThumbnailClick', this.onThumbnailClick);
            this.listenTo(this.thumbnailsCompositeView, 'onShowAllClick', this.onShowAllClick);
        },

        showHotspots: function(index) {
            var bikeModel = this.bikeManager.bikeCollection.at(index);
            var partCollection = this.bikeManager.partCollection.getParts(bikeModel.get('parts'));
            bikeModel.setPartCollection(partCollection);

            this.hotspotsCarouselLayout.hotspots.show(this.hotspotsCollectionView);
            this.hotspotsCollectionView.showHotspots(bikeModel.getHotspotCollection());
        },

        showBikeDetailLayout: function(bikeModel, showBikeImage) {
            var partCollection = this.bikeManager.partCollection.getParts(bikeModel.get('parts'));
            bikeModel.setPartCollection(partCollection);

            this.modal.show(this.bikeDetailLayout);
            this.bikeDetailLayout.showModal(bikeModel, partCollection, showBikeImage);
            this.carouselCompositeView.pauseCarousel();
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