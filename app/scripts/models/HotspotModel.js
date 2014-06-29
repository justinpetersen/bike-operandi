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

        initialize: function() {
            this.set('url', 'http://www.amazon.com/exec/obidos/ASIN/' + this.get('asin'));
            if (this.get('image') == '') {
                this.set('image', 'http://images.amazon.com/images/P/' + this.get('asin') + '.01.MZZZZZZZ.jpg');
            }
        }
    });

    return HotspotModel;
});
