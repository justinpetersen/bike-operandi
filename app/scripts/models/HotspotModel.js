define([
    'jquery',
    'backbone',
    'models/PartModel'
], function ($, Backbone, PartModel) {
    'use strict';

    var HotspotModel = Backbone.Model.extend({
        defaults: {
            id: '',
            x: 0,
            y: 0,
            title: '',
            image: '',
            url: '#'
        },

        title: function() {
            return this.partModel.get('title');
        },

        image: function() {
            return this.partModel.get('image');
        },

        url: function() {
            return this.partModel.get('url');
        },

        get: function (attr) {
            if (typeof this[attr] == 'function')
            {
                return this[attr]();
            }
            return Backbone.Model.prototype.get.call(this, attr);
        },

        partModel: null,

        // onSync: function() {
        //     if (this.get('url') == null || this.get('url') == this.defaults.url) {
        //         this.set('url', 'http://www.amazon.com/exec/obidos/ASIN/' + this.get('id') + '?tag=bikeoper-20');
        //     }
        //     if (this.get('image') == null || this.get('image') == this.defaults.image) {
        //         this.set('image', 'http://images.amazon.com/images/P/' + this.get('id') + '.01.MZZZZZZZ.jpg');
        //     }
        // },

        setPartModel: function(model) {
            this.partModel = model;
        },

        initialize: function() {
            // this.listenTo(this, 'sync', this.onSync);
        }
    });

    return HotspotModel;
});
