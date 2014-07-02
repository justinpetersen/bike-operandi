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

        showModal: function(model) {
            this.bikeHeaderView = new BikeHeaderView({ model: model });
            this.header.show(this.bikeHeaderView);

            this.bikeView = new BikeView({ model: model });
            this.bike.show(this.bikeView);

            this.partsCollectionView = new PartsCollectionView({ collection: model.get('hotspots') });
            this.parts.show(this.partsCollectionView);

            $('#bike-detail-modal').modal('show');
        }
    });

    return BikeDetailLayout;
});