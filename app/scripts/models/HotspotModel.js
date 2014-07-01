define([
    'backfire'
], function (Backbone) {
    'use strict';

    var HotspotModel = Backbone.Firebase.Model.extend({
        defaults: {
            id: '',
            x: 0,
            y: 0,
            title: '',
            asin: '',
            image: '',
            url: '#'
        },

        onSync: function() {
            if (this.get('url') == this.defaults.url) {
                this.set('url', 'http://www.amazon.com/exec/obidos/ASIN/' + this.get('asin') + '?tag=bikeoper-20');
                console.log('url: ' + this.get('url'));
            }
            if (this.get('image') == this.defaults.image) {
                this.set('image', 'http://images.amazon.com/images/P/' + this.get('asin') + '.01.MZZZZZZZ.jpg');
            }
        },

        initialize: function() {
            this.listenTo(this, 'sync', this.onSync);
        }
    });

    return HotspotModel;
});
