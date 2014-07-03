define([
    'backbone',
    'collections/PartCollection',
    // 'models/HotspotModel',
    // 'collections/HotspotCollection'
], function (Backbone, PartCollection) {
    'use strict';

    var BikeModel = Backbone.Model.extend({
        RESET_FIREBASE: false,

        defaults: {
            title: '',
            image: '',
            tags: '',
            'part-hotspots': [],
            parts: ''
        },

        partCollection: null,

        onAdd: function() {
            if (this.RESET_FIREBASE) {
                this.resetFirebase();
            }
        },

        onPartRemoved: function(model) {
            this.removePart(model.get('id'));
        },

        setPartCollection: function(collection) {
            this.partCollection = collection;
            this.listenTo(this.partCollection, 'remove', this.onPartRemoved);
        },

        initialize: function(attrs, options) {
            // this.parseHotspots(attrs['part-hotspots']);
            this.listenTo(this, 'add', this.onAdd);
        },

        // parseHotspots: function(hotspotArray) {
        //     this.set('part-hotspots', new HotspotCollection());
        //     for (var i=0; i<hotspotArray.length; i++) {
        //         var FirebaseHotspotModel = HotspotModel.extend( { firebase: this.collection.firebase.child(this.id).child('part-hotspots').child(i) } );
        //         var hotspot = new FirebaseHotspotModel(hotspotArray[i]);
        //         hotspot.set('id', 'hotspot-' + i);
        //         this.get('part-hotspots').add(hotspot);
        //     }
        // },

        removePart: function(id) {
            var partsNew = this.get('parts');
            partsNew[id] = false;
            this.unset('parts');
            this.set('parts', partsNew);
        },

        resetFirebase: function() {
            this.createPartTable();
        },

        createPartTable: function() {
            var ids = {};
            var hotspots = this.get('part-hotspots');
            for (var i=0; i<hotspots.length; i++) {
                ids[hotspots[i].asin] = true;
            }
            this.set('parts', ids);
        }
    });

    return BikeModel;
});
