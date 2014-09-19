define([
    'templates',
    'marionette',
    'views/BikeView',
    'views/PartListCollectionView',
], function (JST, Marionette, BikeView, PartListCollectionView) {
    'use strict';

    var AddHotspotsLayout = Marionette.Layout.extend({
        template: JST['app/scripts/templates/AddHotspotsLayout.ejs'],

        regions: {
            bike: '#hotspot-bike-container',
            parts: '#hotspot-parts-container'
        },

        bikeModel: null,

        partCollection: null,

        allPartsCollection: null,

        bikeView: null,

        partListCollectionView: null,

        setModels: function(bikeModel, partCollection, allPartsCollection) {
            this.bikeModel = bikeModel;
            this.partCollection = partCollection;
            this.allPartsCollection = allPartsCollection;

            this.bikeView = new BikeView({ model: bikeModel });
            this.bike.show(this.bikeView);

            this.partListCollectionView = new PartListCollectionView({ collection: partCollection });
            this.partListCollectionView.setModels(bikeModel, partCollection, allPartsCollection);
            this.parts.show(this.partListCollectionView);
        }
    });

    return AddHotspotsLayout;
});