define([
    'backbone',
    'collections/PartCollection',
    'collections/HotspotCollection',
    'models/HotspotModel'
], function (Backbone, PartCollection, HotspotCollection, HotspotModel) {
    'use strict';

    var BikeModel = Backbone.Model.extend({
        defaults: {
            title: '',
            image: '',
            tags: '',
            parts: {},
            hotspots: {}
        },

        partCollection: null,

        hotspotCollection: null,

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

        initHotspotCollection: function() {
            var FirebaseHotspotCollection = HotspotCollection.extend( { firebase: this.collection.firebase.child(this.get('id')).child('hotspots') } );
            this.hotspotCollection = new FirebaseHotspotCollection();
            for (var i=0; i<this.hotspotCollection.length; i++) {
                var hotspot = this.hotspotCollection.at(i);
                this.initHotspotPart(hotspot);
            }
        },

        initHotspotPart: function(hotspot) {
            var partModel = this.partCollection.findWhere( { id: hotspot.get('part-id') } );
            hotspot.setPartModel(partModel);
        },

        initialize: function(attrs, options) {
            this.listenTo(this, 'add', this.onAdd);
        },

        addPart: function(id) {
            var partsNew = this.get('parts');
            partsNew[id] = true;
            this.unset('parts');
            this.set('parts', partsNew);
        },

        removePart: function(id) {
            var partsNew = this.get('parts');
            partsNew[id] = false;
            this.unset('parts');
            this.set('parts', partsNew);

            this.hotspotCollection.remove(this.hotspotCollection.where( { 'part-id': id } ));
        },

        addHotspot: function(partId) {
            var id = '0';
            if (this.hotspotCollection.length > 0) {
                id = parseInt(this.hotspotCollection.at(this.hotspotCollection.length - 1).get('id')) + 1;
            }
            var hotspot = new HotspotModel({
                id: id,
                'part-id': partId,
                x: 0,
                y: 0,
                title: 'Test'
            });
            this.initHotspotPart(hotspot);

            this.hotspotCollection.add(hotspot);
        },

        removeHotspot: function(id) {
            this.hotspotCollection.remove(this.hotspotCollection.where( { 'id': id } ));
        }
    });

    return BikeModel;
});
