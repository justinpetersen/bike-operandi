define([
    'marionette',
    'views/BikeHeaderView',
    'views/BikeView',
    'views/HotspotsCollectionView',
    'views/PartsCollectionView',
    'collections/ButtonCollection',
    'views/ButtonCompositeView'
], function (Marionette, BikeHeaderView, BikeView, HotspotsCollectionView, PartsCollectionView, ButtonCollection, ButtonCompositeView) {
    'use strict';

    var BikeDetailLayout = Marionette.Layout.extend({
        template: JST['app/scripts/templates/BikeDetailLayout.ejs'],

        regions: {
            header: '#header-container',
            bike: '#bike-container',
            hotspots: '#detail-hotspots-container',
            operations: '#operations-container',
            parts: '#parts-container'
        },

        bikeHeaderView: null,

        bikeView: null,

        hotspotsCollectionView: null,

        operationButtonCollectionView: null,

        partsCollectionView: null,

        onRender: function() {
            $('#bike-detail-modal').on('hidden.bs.modal', $.proxy(this.onModalHidden, this));

            if (this.getUrlVars()['edit']) {
                this.showEditButtons();
            }
        },

        onOperationsButtonClick: function(event) {
            switch (event.model.get('value')) {
                case 'details':
                    this.bikeHeaderView.showPartEditForm();
                    break;
                case 'parts':
                    console.log('Add part!');
                    break;
            }
        },

        onModalHidden: function() {
            this.trigger('onModalHidden');
        },

        showModal: function(bikeModel, partCollection, showBikeImage) {
            if (bikeModel) {
                this.bikeHeaderView = new BikeHeaderView({ model: bikeModel });
                this.header.show(this.bikeHeaderView);
            }

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

            this.showOperations();

            $('#bike-detail-modal').modal('show');
        },

        showOperations: function() {
            var operationsCollection = new ButtonCollection([
                { label: 'Edit Details', value: 'details' },
                { label: 'Add Parts', value: 'parts' }
            ]);
            this.operationButtonCompositeView = new ButtonCompositeView({ collection: operationsCollection });
            this.listenTo(this.operationButtonCompositeView, 'onButtonClick', this.onOperationsButtonClick);
            this.operations.show(this.operationButtonCompositeView);
        },

        showEditButtons: function() {
            this.$el.find('#operations-container').show();
        },

        // TODO: Move this to router
        getUrlVars: function() {
            var vars = [], hash;
            var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
            for (var i = 0; i < hashes.length; i++)
            {
                hash = hashes[i].split('=');
                vars.push(hash[0]);
                vars[hash[0]] = hash[1];
            }
            return vars;
        }
    });

    return BikeDetailLayout;
});