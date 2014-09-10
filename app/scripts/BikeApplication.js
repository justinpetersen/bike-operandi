define([
    'marionette',
    'controllers/BikeManager',
    'views/layout/NavLayout',
    'views/CarouselCompositeView',
    'views/HotspotsCollectionView',
    'views/layout/HotspotsCarouselLayout',
    'views/layout/BikeDetailLayout',
    'views/layout/AddPartLayout',
    'views/layout/ThumbnailFiltersLayout',
    'views/FilterButtonCollectionView',
    'views/ThumbnailsCompositeView',
    'views/layout/PartFilterLayout'
], function (Marionette, BikeManager, NavLayout, CarouselCompositeView, HotspotsCollectionView, HotspotsCarouselLayout, BikeDetailLayout, AddPartLayout, ThumbnailFiltersLayout, FilterButtonCollectionView, ThumbnailsCompositeView, PartFilterLayout) {
    'use strict';

    var BikeApplication = Marionette.Application.extend({
        bikeManager: null,

        navLayout: null,

        hotspotsCarouselLayout: null,

        carouselCompositeView: null,

        hotspotsCollectionView: null,

        bikeDetailLayout: null,

        addPartLayout: null,

        thumbnailFiltersLayout: null,

        filterButtonCollectionView: null,

        thumbnailsCompositeView: null,

        partsCollectionView: null,

        partFilterLayout: null,

        hotspotsOn: true,

        onSyncComplete: function() {
            this.showHotspots(0);
        },

        onNavButtonClick: function(event) {
            switch (event.model.get('id')) {
                case 'bikes':
                    this.showBikes();
                    break;
                case 'parts':
                    this.showParts();
                    break;
            }
            $('body').animate({ scrollTop: 0 }, '500');
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

        onOperationsButtonClick: function(event) {
            switch (event.model.get('value')) {
                case 'add':
                    this.showAddPartLayout();
            }
        },

        initialize: function() {
            this.addRegions({
                nav: '#nav-container',
                modal: '#modal-container',
                hero: '#hero-container',
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
            this.initAddPartLayout();
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
            this.hero.show(this.hotspotsCarouselLayout);

            this.carouselCompositeView = new CarouselCompositeView({ collection: this.bikeManager.bikeCollection });
            this.hotspotsCarouselLayout.carousel.show(this.carouselCompositeView);

            this.hotspotsCollectionView = new HotspotsCollectionView();
            this.hotspotsCarouselLayout.hotspots.show(this.hotspotsCollectionView);
        },

        initBikeDetailLayout: function() {
            this.bikeDetailLayout = new BikeDetailLayout();
        },

        initAddPartLayout: function() {
            this.addPartLayout = new AddPartLayout();
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
            this.listenTo(this.navLayout, 'onNavButtonClick', this.onNavButtonClick);
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

        showAddPartLayout: function() {
            this.modal.show(this.addPartLayout);
            this.addPartLayout.showModal(this.bikeManager.partCollection);
        },

        showBikes: function() {
            // TODO: Improve how regions are shown
            $('#hero-container').show();
            this.carouselCompositeView.resumeCarousel();

            this.content.show(this.thumbnailFiltersLayout);
            this.thumbnailFiltersLayout.filters.show(this.filterButtonCollectionView);
            this.thumbnailFiltersLayout.thumbnails.show(this.thumbnailsCompositeView);
        },

        showParts: function() {
            // TODO: Improve how regions are shown
            this.carouselCompositeView.pauseCarousel();
            $('#hero-container').hide();

            this.partFilterLayout = new PartFilterLayout();
            this.listenTo(this.partFilterLayout, 'onOperationsButtonClick', this.onOperationsButtonClick);
            this.partFilterLayout.render();
            this.content.show(this.partFilterLayout);
            this.partFilterLayout.showPartFilters(this.bikeManager.partCategoryCollection, this.bikeManager.partCollection);
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