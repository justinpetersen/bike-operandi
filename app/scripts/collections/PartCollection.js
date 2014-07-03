define([
    'backfire',
    'models/PartModel'
], function (Backbone, PartModel) {
    'use strict';

    var PartCollection = Backbone.Firebase.Collection.extend({
        model: PartModel,

        getParts: function(ids) {
        	var partsCollection = new Backbone.Collection();
        	for (var i in ids) {
        		if (ids[i]) {
        			partsCollection.add(this.findWhere( { id: i } ));
        		}
        	}
        	return partsCollection;
        }
    });

    return PartCollection;
});
