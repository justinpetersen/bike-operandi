define([
    'backbone',
    'require'
], function (Backbone, require) {
    'use strict';

    var BikeFilterModel = Backbone.Model.extend({
        defaults: {
            label: '',
            value: '',
            children: []
        },

        selected: '*',

        initialize: function() {
            // The id is a string by default. Parse it to an integer so that the models will be sorted correctly.
            this.id = parseInt(this.id);

            var children = this.get('children');
            if (children.length > 0) {
                var BikeFilterCollection = require('collections/BikeFilterCollection');
                var ChildrenBikeFilterCollection = BikeFilterCollection.extend({ firebase: this.collection.firebase.child(this.id).child('children') });
                this.children = new ChildrenBikeFilterCollection();
            }
        }
    });

    return BikeFilterModel;
});
