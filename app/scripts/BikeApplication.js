define([
    'marionette',
    'collections/BikeCollection',
    'views/CarouselCompositeView',
    'views/HotspotsCollectionView',
    'views/layout/BikeApplicationLayout'
], function (Marionette, BikeCollection, CarouselCompositeView, HotspotsCollectionView, BikeApplicationLayout) {
    'use strict';

    var BikeApplication = Marionette.Application.extend({
        bikeApplicationLayout: null,

        bikeCollection: null,

        bikesCompositeView: null,

        hotspotsCollectionView: null,

        onSync: function() {
            this.showHotspots(0);
        },

        onCarouselSlide: function(index) {
            this.bikeApplicationLayout.hotspots.close();
        },

        onCarouselSlid: function(index) {
            this.showHotspots(index);
        },

        initialize: function() {
            this.addRegions({
                main: '#main-container'
            });

            this.addInitializer(function(options){
                this.initializeViews();
            });
        },

        initializeViews: function() {
            this.bikeApplicationLayout = new BikeApplicationLayout();
            this.bikeApplicationLayout.render();

            this.main.show(this.bikeApplicationLayout);

            this.bikeCollection = new BikeCollection();

            this.carouselCompositeView = new CarouselCompositeView({ collection: this.bikeCollection });
            this.bikeApplicationLayout.carousel.show(this.carouselCompositeView);

            this.hotspotsCollectionView = new HotspotsCollectionView();
            this.bikeApplicationLayout.hotspots.show(this.hotspotsCollectionView);

            this.listenTo(this.carouselCompositeView, 'onCarouselSlide', this.onCarouselSlide);
            this.listenTo(this.carouselCompositeView, 'onCarouselSlid', this.onCarouselSlid);
            this.listenTo(this.bikeCollection, 'sync', this.onSync);
        },

        showHotspots: function(index) {
            var activeIndex = $('.carousel').data('bs.carousel').getActiveIndex();
            var activeBikeModel = this.bikeCollection.at(activeIndex);
            if (activeBikeModel) {
                this.bikeApplicationLayout.hotspots.show(this.hotspotsCollectionView);
                this.hotspotsCollectionView.collection = activeBikeModel.get('hotspots');
                this.hotspotsCollectionView.render();
            }
        }
    });

    var application = new BikeApplication();
    application.initialize();

    return application;
});