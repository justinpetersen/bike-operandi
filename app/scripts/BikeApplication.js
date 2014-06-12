define([
    'marionette',
    'collections/BikeCollection',
    'views/BikesView',
    'views/HotspotsView',
    'views/layout/BikeApplicationLayout'
], function (Marionette, BikeCollection, BikesCompositeView, HotspotsCollectionView, BikeApplicationLayout) {
    'use strict';

    var BikeApplication = Marionette.Application.extend({
        bikeApplicationLayout: null,

        bikeCollection: null,

        bikesCompositeView: null,

        hotspotsCollectionView: null,

        onSync: function() {
            this.showHotspots(0);
        },

        showHotspots: function(index) {
            var activeIndex = $('.carousel').data('bs.carousel').getActiveIndex();
            var activeBikeModel = this.bikeCollection.at(activeIndex);
            if (activeBikeModel) {
                // this.hotspotsCollectionView.showHotspots(activeBikeModel.get('hotspots'));
                this.hotspotsCollectionView.collection = activeBikeModel.get('hotspots');
                this.hotspotsCollectionView.render();
            }
        }
    });

    var application = new BikeApplication();

    application.addRegions({
        main: '#main-container'
    });

    application.addInitializer(function(options){
        this.bikeApplicationLayout = new BikeApplicationLayout();
        this.bikeApplicationLayout.render();

        this.main.show(this.bikeApplicationLayout);

        this.bikeCollection = new BikeCollection();

        this.bikesCompositeView = new BikesCompositeView({ collection: this.bikeCollection });
        this.bikeApplicationLayout.carousel.show(this.bikesCompositeView);

        this.hotspotsCollectionView = new HotspotsCollectionView();
        this.bikeApplicationLayout.hotspots.show(this.hotspotsCollectionView);

        this.listenTo(this.bikeCollection, 'sync', this.onSync);
    });

    return application;
});