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

    var BikeEditLayout = Marionette.Layout.extend({
        template: JST['app/scripts/templates/BikeEditLayout.ejs'],

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

        bikeModel: null,

        bikeHeaderView: null,

        bikeView: null,

        // TODO: Move this into AddHotspotLayout
        hotspotsCollectionView: null,

        operationButtonCollectionView: null,

        editDetailsView: null,

        addPartsCollectionView: null,

        addHotspotsLayout: null,

        partsCollectionView: null,

        onRender: function() {
            $('#bike-edit-modal').on('hidden.bs.modal', $.proxy(this.onModalHidden, this));
        },

        onSaveClick: function() {
            this.hideModal();
        },

        onCancelClick: function() {
            this.hideModal();
        },

        onDragHotspotOutside: function(itemView) {
            this.bikeModel.removeHotspot(itemView.model.get('id'));
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

        showModal: function(bikeModel, partCollection, allPartsCollection) {
            this.bikeModel = bikeModel;

            this.bikeHeaderView = new BikeHeaderView({ model: bikeModel });
            this.header.show(this.bikeHeaderView);

            this.bikeView = new BikeView({ model: bikeModel });
            this.bike.show(this.bikeView);

            // TODO: Enable hotspots
            this.hotspotsCollectionView = new HotspotsCollectionView();
            this.hotspotsCollectionView.showHotspots(bikeModel.getHotspotCollection());
            this.hotspots.show(this.hotspotsCollectionView);
            this.listenTo(this.hotspotsCollectionView, 'onDragOutside', this.onDragHotspotOutside);

            this.editDetailsView = new EditDetailsView({ model: bikeModel });
            this.editDetails.show(this.editDetailsView);
            this.listenTo(this.editDetailsView, 'onSave', this.onSaveClick);
            this.listenTo(this.editDetailsView, 'onCancel', this.onCancelClick);

            this.addPartsCollectionView = new PartListCollectionView({ collection: allPartsCollection });
            this.addPartsCollectionView.setModels(bikeModel, partCollection, allPartsCollection);
            this.addParts.show(this.addPartsCollectionView);

            this.addHotspotsLayout = new AddHotspotsLayout();
            this.addHotspots.show(this.addHotspotsLayout);
            this.addHotspotsLayout.setModels(bikeModel, partCollection, allPartsCollection);

            this.partsCollectionView = new PartsCollectionView({ collection: partCollection });
            this.parts.show(this.partsCollectionView);

            this.showOperations();
            this.hideAddPartsLayout();

            $('#bike-edit-modal').modal('show');
        },

        hideModal: function() {
            $('#bike-edit-modal').modal('hide');
        },

        showOperations: function() {
            var operationsCollection = new ButtonCollection([
                { label: 'Bike Details', value: 'details' },
                { label: 'Equipment Grouping', value: 'parts' },
                { label: 'Hotspots', value: 'hotspots' }
            ]);
            this.operationButtonCompositeView = new ButtonCompositeView({ collection: operationsCollection });
            this.listenTo(this.operationButtonCompositeView, 'onButtonClick', this.onOperationsButtonClick);
            this.operations.show(this.operationButtonCompositeView);
        },

        showEditDetailsView: function() {
            this.$el.find('#bike-container').show();
            this.$el.find('#edit-details-container').show();
        },

        hideEditDetailsView: function() {
            this.$el.find('#bike-container').hide();
            this.$el.find('#edit-details-container').hide();
        },

        showAddPartsLayout: function() {
            this.$el.find('#add-parts-container').show();
            this.$el.find('#parts-container').show();
            this.partsCollectionView.fixIsotope();
        },

        hideAddPartsLayout: function() {
            this.$el.find('#add-parts-container').hide();
            this.$el.find('#parts-container').hide();
        },

        showAddHotspotsLayout: function() {
            this.$el.find('#detail-hotspots-container').show();
            this.$el.find('#add-hotspots-container').show();
            this.hotspotsCollectionView.setTargetImage($('#bike-container'));
        },

        hideAddHotspotsLayout: function() {
            this.$el.find('#detail-hotspots-container').hide();
            this.$el.find('#add-hotspots-container').hide();
        }
    });

    return BikeEditLayout;
});