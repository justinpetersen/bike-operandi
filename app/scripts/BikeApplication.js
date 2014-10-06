define([
    'marionette',
    'controllers/BikeManager',
    'views/layout/NavLayout',
    'views/CarouselCompositeView',
    'views/HotspotsCollectionView',
    'views/layout/HotspotsCarouselLayout',
    'views/layout/BikeDetailLayout',
    'views/layout/BikeEditLayout',
    'views/layout/AddBikeLayout',
    'views/layout/AddPartLayout',
    'views/layout/ThumbnailFiltersLayout',
    'views/layout/PartFilterLayout'
], function (Marionette, BikeManager, NavLayout, CarouselCompositeView, HotspotsCollectionView, HotspotsCarouselLayout, BikeDetailLayout, BikeEditLayout, AddBikeLayout, AddPartLayout, ThumbnailFiltersLayout, PartFilterLayout) {
    'use strict';

    var BikeApplication = Marionette.Application.extend({
        bikeManager: null,

        navLayout: null,

        hotspotsCarouselLayout: null,

        carouselCompositeView: null,

        hotspotsCollectionView: null,

        bikeDetailLayout: null,

        bikeEditLayout: null,

        addBikeLayout: null,

        addPartLayout: null,

        thumbnailFiltersLayout: null,

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

        onPopoverShown: function() {
            this.carouselCompositeView.pauseCarousel();
        },

        onPartsClick: function(itemView) {
            this.showBikeDetailLayout(itemView.model, false);
        },

        onHotspotsClick: function() {
            this.toggleHotspots();
        },

        onEditClick: function(itemView) {
            this.showBikeEditLayout(itemView.model);
        },

        onModalHidden: function() {
            this.carouselCompositeView.resumeCarousel();
            
            // KLUDGE: Update hotspot positions in case changes have been made in the edit view
            this.hotspotsCollectionView.render();
        },

        onBikeAdded: function(bikeModel) {
            this.showBikeEditLayout(bikeModel);
        },

        onThumbnailClick: function(itemView) {
            this.showBikeDetailLayout(itemView.model, true);
        },

        onBikesOperationsButtonClick: function(event) {
            switch (event.model.get('value')) {
                case 'add':
                    this.showAddBikeLayout();
            }
        },

        onPartsOperationsButtonClick: function(event) {
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
                this.showBikes();
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
            this.initBikeEditLayout();
            this.initAddBikeLayout();
            this.initAddPartLayout();

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

        initBikeEditLayout: function() {
            this.bikeEditLayout = new BikeEditLayout();
        },

        initAddBikeLayout: function() {
            this.addBikeLayout = new AddBikeLayout();
        },

        initAddPartLayout: function() {
            this.addPartLayout = new AddPartLayout();
        },

        initViewEvents: function() {
            // TODO: Move carousel and hotspot functionality into CarouselCompositeView
            this.listenTo(this.navLayout, 'onNavButtonClick', this.onNavButtonClick);
            this.listenTo(this.carouselCompositeView, 'onCarouselSlide', this.onCarouselSlide);
            this.listenTo(this.carouselCompositeView, 'onCarouselSlid', this.onCarouselSlid);
            this.listenTo(this.hotspotsCollectionView, 'onPopoverShown', this.onPopoverShown);
            this.listenTo(this.hotspotsCollectionView, 'onPopoverHidden', this.onPopoverHidden);
            this.listenTo(this.carouselCompositeView, 'onPartsClick', this.onPartsClick);
            this.listenTo(this.carouselCompositeView, 'onHotspotsClick', this.onHotspotsClick);
            this.listenTo(this.carouselCompositeView, 'onEditClick', this.onEditClick);
            this.listenTo(this.bikeDetailLayout, 'onModalHidden', this.onModalHidden);
            this.listenTo(this.bikeEditLayout, 'onModalHidden', this.onModalHidden);
            this.listenTo(this.addBikeLayout, 'onModalHidden', this.onModalHidden);
            this.listenTo(this.addBikeLayout, 'onBikeAdded', this.onBikeAdded);
            this.listenTo(this.addPartLayout, 'onModalHidden', this.onModalHidden);
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
            this.bikeDetailLayout.showModal(bikeModel, partCollection, this.bikeManager.partCollection, showBikeImage);
            this.carouselCompositeView.pauseCarousel();
        },

        showBikeEditLayout: function(bikeModel) {
            var partCollection = this.bikeManager.partCollection.getParts(bikeModel.get('parts'));
            bikeModel.setPartCollection(partCollection);

            this.modal.show(this.bikeEditLayout);
            this.bikeEditLayout.showModal(bikeModel, partCollection, this.bikeManager.partCollection);
            this.carouselCompositeView.pauseCarousel();
        },

        showAddBikeLayout: function() {
            this.modal.show(this.addBikeLayout);
            this.addBikeLayout.showModal(this.bikeManager.bikeCollection);
        },

        showAddPartLayout: function() {
            this.modal.show(this.addPartLayout);
            this.addPartLayout.showModal(this.bikeManager.partCollection);
        },

        showBikes: function() {
            // TODO: Improve how regions are shown
            $('#hero-container').show();
            this.carouselCompositeView.resumeCarousel();

            this.thumbnailFiltersLayout = new ThumbnailFiltersLayout();
            this.listenTo(this.thumbnailFiltersLayout, 'onOperationsButtonClick', this.onBikesOperationsButtonClick);
            this.listenTo(this.thumbnailFiltersLayout, 'onThumbnailClick', this.onThumbnailClick);
            this.thumbnailFiltersLayout.render();
            this.content.show(this.thumbnailFiltersLayout);
            this.thumbnailFiltersLayout.showThumbnailFilters(this.bikeManager.bikeFilterCollection, this.bikeManager.bikeCollection);
        },

        showParts: function() {
            // TODO: Improve how regions are shown
            this.carouselCompositeView.pauseCarousel();
            $('#hero-container').hide();

            this.partFilterLayout = new PartFilterLayout();
            this.listenTo(this.partFilterLayout, 'onOperationsButtonClick', this.onPartsOperationsButtonClick);
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
        }
    });

    var application = new BikeApplication();
    application.initialize();

    return application;
});