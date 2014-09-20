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
            $('#bike-detail-modal').on('hidden.bs.modal', $.proxy(this.onModalHidden, this));
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

                // TODO: Enable hotspots
                this.hotspotsCollectionView = new HotspotsCollectionView();
                this.hotspotsCollectionView.showHotspots(bikeModel.getHotspotCollection());
                this.hotspots.show(this.hotspotsCollectionView);
            }

            this.partsCollectionView = new PartsCollectionView({ collection: partCollection });
            this.parts.show(this.partsCollectionView);

            $('#bike-detail-modal').modal('show');
        }
    });

    return BikeDetailLayout;
});