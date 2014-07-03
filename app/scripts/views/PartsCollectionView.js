define([
    'marionette',
    'views/PartItemView'
], function (Marionette, PartItemView) {
    'use strict';

    var PartsCollectionView = Marionette.CollectionView.extend({
    	itemView: PartItemView,

    	onDeleteClick: function(itemView) {
    		this.collection.remove(itemView.model);
    	},

    	initialize: function() {
            this.on('itemview:onDeleteClick', $.proxy(this.onDeleteClick, this));
    	}
    });

    return PartsCollectionView;
});