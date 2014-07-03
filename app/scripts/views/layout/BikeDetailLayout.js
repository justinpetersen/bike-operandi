define([
    'marionette',
    'views/BikeHeaderView',
    'views/BikeView',
    'views/PartsCollectionView'
], function (Marionette, BikeHeaderView, BikeView, PartsCollectionView) {
    'use strict';

    var BikeDetailLayout = Marionette.Layout.extend({
        template: JST['app/scripts/templates/BikeDetailLayout.ejs'],

        regions: {
            header: '#header-container',
            bike: '#bike-container',
            parts: '#parts-container'
        },

        bikeHeaderView: null,

        bikeView: null,

        partsCollectionView: null,

        onRender: function() {
            $('#bike-detail-modal').on('hidden.bs.modal', $.proxy(this.onModalHidden, this));
        },

        onModalHidden: function() {
            this.trigger('onModalHidden');
        },

        showModal: function(bikeModel, partCollection, showBikeImage) {
            this.bikeHeaderView = new BikeHeaderView({ model: bikeModel });
            this.header.show(this.bikeHeaderView);

            if (showBikeImage) {
                this.bikeView = new BikeView({ model: bikeModel });
                this.bike.show(this.bikeView);
            }

            this.partsCollectionView = new PartsCollectionView({ collection: partCollection });
            this.parts.show(this.partsCollectionView);

            $('#bike-detail-modal').modal('show');
        }
    });

    return BikeDetailLayout;
});