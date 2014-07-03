define([
    'backbone',
    'collections/PartCollection',
    // 'models/HotspotModel',
    'collections/HotspotCollection'
], function (Backbone, PartCollection, HotspotCollection) {
    'use strict';

    var BikeModel = Backbone.Model.extend({
        RESET_FIREBASE: false,

        defaults: {
            title: '',
            image: '',
            tags: '',
            'part-hotspots': [],
            parts: {},
            hotspots: {}
        },

        partCollection: null,

        hotspotCollection: null,

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

            this.initHotspotCollection();
        },

        getHotspotCollection: function() {
            return this.hotspotCollection;
        },

        initHotspotCollection: function(collection) {
            var FirebaseHotspotCollection = HotspotCollection.extend( { firebase: this.collection.firebase.child(this.get('id')).child('hotspots') } );
            this.hotspotCollection = new FirebaseHotspotCollection();
            for (var i=0; i<this.hotspotCollection.length; i++) {
                var hotspot = this.hotspotCollection.at(i);
                var partModel = this.partCollection.findWhere( { id: hotspot.get('part-id') } );
                hotspot.setPartModel(partModel);
            }
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
            this.createHotspotCollection();
        },

        createPartTable: function() {
            var ids = {};
            var partHotspots = this.get('part-hotspots');
            for (var i=0; i<partHotspots.length; i++) {
                ids[partHotspots[i].asin] = true;
            }
            this.set('parts', ids);
        },

        createHotspotCollection: function() {
            var hotspots = {};
            var partHotspots = this.get('part-hotspots');
            for (var i=0; i<partHotspots.length; i++) {
                hotspots[i] = {
                    id: i,
                    'part-id': partHotspots[i].asin,
                    x: partHotspots[i].x,
                    y: partHotspots[i].y
                };
            }
            this.set('hotspots', hotspots);
        }
    });

    return BikeModel;
});
