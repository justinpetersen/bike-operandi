define([
    'backfire',
    'models/PartModel'
], function (Backbone, PartModel) {
    'use strict';

    var PartCollection = Backbone.Firebase.Collection.extend({
        model: PartModel,

        onSync: function() {
        },

        getParts: function(ids) {
        	var partsCollection = new Backbone.Collection();
        	for (var i in ids) {
        		if (ids[i]) {
        			partsCollection.add(this.findWhere( { id: i } ));
        		}
        	}
        	return partsCollection;
        },

        initialize: function() {
            this.listenTo(this, 'sync', this.onSync);
        }
    });

    return PartCollection;
});
