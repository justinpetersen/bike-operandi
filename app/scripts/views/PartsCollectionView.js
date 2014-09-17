define([
    'marionette',
    'views/PartItemView'
], function (Marionette, PartItemView) {
    'use strict';

    var PartsCollectionView = Marionette.CollectionView.extend({
    	itemView: PartItemView,

        onAddChild: function() {
            console.log('onAddChild');
        },

    	onDeleteClick: function(itemView) {
    		this.collection.remove(itemView.model);
    	},

    	initialize: function() {
            this.on('itemview:onDeleteClick', $.proxy(this.onDeleteClick, this));
            this.on('after:item:added', $.proxy(this.onAddChild, this));
    	}
    });

    return PartsCollectionView;
});