define([
    'marionette',
    'collections/BikeCollection',
    'collections/BikeFilterCollection',
    'collections/PartCollection'
], function (Marionette, BikeCollection, BikeFilterCollection, PartCollection) {
    'use strict';

    var BikeManager = Marionette.Controller.extend({
        RESET_FIREBASE: false,

        bikeCollection: null,

        bikeFilterCollection: null,

        partCollection: null,

        onBikesSync: function() {
            this.initSecondaryCollections();
        },

        onPartsSync: function() {
            if (this.RESET_FIREBASE) {
                this.resetFirebase();
            } else {
                this.trigger('onSyncComplete');
            }
        },

        initialize: function() {
            this.initPrimaryCollections();
        },

        initPrimaryCollections: function() {
            var FirebaseBikeCollection = BikeCollection.extend({ firebase: 'https://bike-operandi.firebaseio.com/bikes' });
            this.bikeCollection = new FirebaseBikeCollection();
            this.listenTo(this.bikeCollection, 'sync', this.onBikesSync);

            var FirebaseBikeFilterCollection = BikeFilterCollection.extend({ firebase: 'https://bike-operandi.firebaseio.com/filters' });
            this.bikeFilterCollection = new FirebaseBikeFilterCollection();
        },

        initSecondaryCollections: function() {
            var FirebasePartCollection = PartCollection.extend({ firebase: 'https://bike-operandi.firebaseio.com/parts' });
            this.partCollection = new FirebasePartCollection();
            this.listenTo(this.partCollection, 'sync', this.onPartsSync);
        },

        resetFirebase: function() {
            this.createGlobalPartCollection();
        },

        createGlobalPartCollection: function() {
            var hotspots;
            for (var i=0; i<this.bikeCollection.length; i++) {
                hotspots = this.bikeCollection.at(i).get('part-hotspots');
                for (var j=0; j<hotspots.length; j++) {
                    this.partCollection.add( { id: hotspots[j].asin, title: hotspots[j].title, image: hotspots[j].image } );
                }
            }
        }
    });

    return BikeManager;
});