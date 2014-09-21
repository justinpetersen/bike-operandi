define([
    'marionette',
    'views/BikeHeaderView',
    'views/BikeView',
    'views/HotspotsCollectionView',
    'views/PartsCollectionView'
], function (Marionette, BikeHeaderView, BikeView, HotspotsCollectionView, PartsCollectionView) {
    'use strict';

    var BikeDetailLayout = Marionette.Layout.extend({
        template: JST['app/scripts/templates/BikeDetailLayout.ejs'],

        regions: {
            header: '#header-container',
            bike: '#bike-container',
            hotspots: '#detail-hotspots-container',
            parts: '#parts-container'
        },

        bikeHeaderView: null,

        bikeView: null,

        hotspotsCollectionView: null,

        partsCollectionView: null,

        onRender: function() {
            this.$el.find('#bike-detail-modal').on('hidden.bs.modal', $.proxy(this.onModalHidden, this));
        },

        onModalHidden: function() {
            this.trigger('onModalHidden');
        },

        showModal: function(bikeModel, partCollection, allPartsCollection, showBikeImage) {
            this.bikeHeaderView = new BikeHeaderView({ model: bikeModel });
            this.header.show(this.bikeHeaderView);

            if (showBikeImage) {
                this.bikeView = new BikeView({ model: bikeModel });
                this.bike.show(this.bikeView);

                this.hotspotsCollectionView = new HotspotsCollectionView();
                this.hotspotsCollectionView.showHotspots(bikeModel.getHotspotCollection());
                this.hotspots.show(this.hotspotsCollectionView);

                // KLUDGE: Wait for image to load so hotspots can be positioned correctly
                setTimeout($.proxy(this.showHotspots, this), 500);
            }

            this.partsCollectionView = new PartsCollectionView({ collection: partCollection });
            this.parts.show(this.partsCollectionView);

            this.$el.find('#bike-detail-modal').modal('show');
        },

        showHotspots: function() {
            this.hotspotsCollectionView.setTargetImage(this.$el.find(this.regions.bike));
            this.$el.find(this.regions.hotspots).show();
        }
    });

    return BikeDetailLayout;
});