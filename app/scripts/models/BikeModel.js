define([
    'underscore',
    'backbone',
    'models/HotspotModel',
    'collections/HotspotCollection'
], function (_, Backbone, HotspotModel, HotspotCollection) {
    'use strict';

    var BikeModel = Backbone.Model.extend({
        defaults: {
            title: '',
            image: '',
            tags: '',
            hotspots: []
        },

        initialize: function(attrs, options) {
            this.parseHotspots(attrs.hotspots);
        },

        parseHotspots: function(hotspotArray) {
            this.set('hotspots', new HotspotCollection());
            for (var i=0; i<hotspotArray.length; i++) {
                var FirebaseHotspotModel = HotspotModel.extend( { firebase: this.collection.firebase.child(this.id).child('hotspots').child(i) } );
                var hotspot = new FirebaseHotspotModel(hotspotArray[i]);
                // TODO: Remove use of id
                hotspot.set('id', 'hotspot-' + i);
                this.get('hotspots').add(hotspot);
            }
        }
    });

    return BikeModel;
});
