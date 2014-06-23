define([
    'backbone',
    'require'
], function (Backbone, require) {
    'use strict';

    var BikeFilterModel = Backbone.Model.extend({
        defaults: {
            label: '',
            children: []
        },

        initialize: function() {
            var children = this.get('children');
            if (children.length > 0) {
                var BikeFilterCollection = require('collections/BikeFilterCollection');
                var ChildrenBikeFilterCollection = BikeFilterCollection.extend({ firebase: this.collection.firebase.child(this.id).child('children') });
                this.children = new ChildrenBikeFilterCollection();
                this.unset('children');
            }
        }
    });

    return BikeFilterModel;
});
