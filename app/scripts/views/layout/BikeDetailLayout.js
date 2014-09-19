define([
    'marionette',
    'views/BikeHeaderView',
    'views/BikeView',
    'views/HotspotsCollectionView',
    'views/EditDetailsView',
    'views/PartListCollectionView',
    'views/layout/AddHotspotsLayout',
    'views/PartsCollectionView',
    'collections/ButtonCollection',
    'views/ButtonCompositeView'
], function (Marionette, BikeHeaderView, BikeView, HotspotsCollectionView, EditDetailsView, PartListCollectionView, AddHotspotsLayout, PartsCollectionView, ButtonCollection, ButtonCompositeView) {
    'use strict';

    var BikeDetailLayout = Marionette.Layout.extend({
        template: JST['app/scripts/templates/BikeDetailLayout.ejs'],

        regions: {
            header: '#header-container',
            bike: '#bike-container',
            hotspots: '#detail-hotspots-container',
            operations: '#operations-container',
            editDetails: '#edit-details-container',
            addParts: '#add-parts-container',
            addHotspots: '#add-hotspots-container',
            parts: '#parts-container'
        },

        bikeHeaderView: null,

        bikeView: null,

        hotspotsCollectionView: null,

        operationButtonCollectionView: null,

        editDetailsView: null,

        addPartsCollectionView: null,

        addHotspotsLayout: null,

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
                    this.hideAddPartsLayout();
                    this.hideAddHotspotsLayout();
                    this.showEditDetailsView();
                    break;
                case 'parts':
                    this.hideEditDetailsView();
                    this.hideAddHotspotsLayout();
                    this.showAddPartsLayout();
                    break;
                case 'hotspots':
                    this.hideEditDetailsView();
                    this.hideAddPartsLayout();
                    this.showAddHotspotsLayout();
                    break;
            }
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

            this.editDetailsView = new EditDetailsView({ model: bikeModel });
            this.editDetails.show(this.editDetailsView);
            this.listenTo(this.editDetailsView, 'onSave', this.hideEditDetailsView);
            this.listenTo(this.editDetailsView, 'onCancel', this.hideEditDetailsView);

            this.addPartsCollectionView = new PartListCollectionView({ collection: allPartsCollection });
            this.addPartsCollectionView.setModels(bikeModel, partCollection, allPartsCollection);
            this.addParts.show(this.addPartsCollectionView);

            this.addHotspotsLayout = new AddHotspotsLayout();
            this.addHotspots.show(this.addHotspotsLayout);
            this.addHotspotsLayout.setModels(bikeModel, partCollection, allPartsCollection);

            this.partsCollectionView = new PartsCollectionView({ collection: partCollection });
            this.parts.show(this.partsCollectionView);

            this.showOperations();

            $('#bike-detail-modal').modal('show');
        },

        showOperations: function() {
            var operationsCollection = new ButtonCollection([
                { label: 'Edit Details', value: 'details' },
                { label: 'Add Parts', value: 'parts' },
                { label: 'Add Hotspots', value: 'hotspots' }
            ]);
            this.operationButtonCompositeView = new ButtonCompositeView({ collection: operationsCollection });
            this.listenTo(this.operationButtonCompositeView, 'onButtonClick', this.onOperationsButtonClick);
            this.operations.show(this.operationButtonCompositeView);
        },

        showEditButtons: function() {
            this.$el.find('#operations-container').show();
        },

        showEditDetailsView: function() {
            this.$el.find('#edit-details-container').show();
            this.$el.find('#parts-container').hide();
        },

        hideEditDetailsView: function() {
            this.$el.find('#edit-details-container').hide();
            this.$el.find('#parts-container').show();
        },

        showAddPartsLayout: function() {
            this.$el.find('#add-parts-container').show();
            this.$el.find('#bike-container').hide();
        },

        hideAddPartsLayout: function() {
            this.$el.find('#add-parts-container').hide();
            this.$el.find('#bike-container').show();
        },

        showAddHotspotsLayout: function() {
            this.$el.find('#add-hotspots-container').show();
            this.$el.find('#bike-container').hide();
            this.$el.find('#parts-container').hide();
        },

        hideAddHotspotsLayout: function() {
            this.$el.find('#add-hotspots-container').hide();
            this.$el.find('#bike-container').show();
            this.$el.find('#parts-container').show();
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