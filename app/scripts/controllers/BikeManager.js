define([
    'marionette',
    'collections/BikeCollection',
    'collections/BikeFilterCollection',
    'collections/PartCollection'
], function (Marionette, BikeCollection, BikeFilterCollection, PartCollection) {
    'use strict';

    var BikeManager = Marionette.Controller.extend({
        bikeCollection: null,

        bikeFilterCollection: null,

        partCategoryCollection: null,

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

            var PartCategoryCollection = BikeFilterCollection.extend({ firebase: 'https://bike-operandi.firebaseio.com/part-categories' });
            this.partCategoryCollection = new PartCategoryCollection();
        },

        initSecondaryCollections: function() {
            var FirebasePartCollection = PartCollection.extend({ firebase: 'https://bike-operandi.firebaseio.com/parts' });
            this.partCollection = new FirebasePartCollection();
            this.partCollection.comparator = 'title';
            this.listenTo(this.partCollection, 'sync', this.onPartsSync);
        }
    });

    return BikeManager;
});