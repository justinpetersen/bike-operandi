define([
    'marionette',
    'views/PartListItemView'
], function (Marionette, PartListItemView) {
    'use strict';

    var PartListCollectionView = Marionette.CollectionView.extend({
    	itemView: PartListItemView,

    	bikeModel: null,

    	partCollection: null,

    	allPartsCollection: null,

    	onAddClick: function(itemView) {
    		var id = itemView.model.get('id');

    		this.bikeModel.addPart(id);
    		this.partCollection.unshift(this.allPartsCollection.getParts(id).at(0));
    	},

    	initialize: function() {
            this.on('itemview:onAddClick', $.proxy(this.onAddClick, this));
    	},

    	setModels: function(bikeModel, partCollection, allPartsCollection) {
    		this.bikeModel = bikeModel;
    		this.partCollection = partCollection;
    		this.allPartsCollection = allPartsCollection;
    	}
    });

    return PartListCollectionView;
});