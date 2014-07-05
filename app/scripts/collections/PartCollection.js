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
        },

        getPartsByAttribute: function(attr, value) {
            var partsCollection = new Backbone.Collection();
            for (var i=0; i<this.length; i++) {
                var part = this.at(i);
                if (part.get(attr).indexOf(value) != -1) {
                    partsCollection.add(part);
                }
            }
            return partsCollection;
        }
    });

    return PartCollection;
});
