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

        partModel: null,

        /*title: function() {
            if (this.partModel == null) {
                return this.defaults.title;
            }
            return this.partModel.get('title');
        },

        image: function() {
            if (this.partModel == null) {
                return this.defaults.image;
            }
            return this.partModel.get('image');
        },

        url: function() {
            if (this.partModel == null) {
                return this.defaults.url;
            }
            return this.partModel.get('url');
        },

        get: function (attr) {
            if (typeof this[attr] == 'function')
            {
                return this[attr]();
            }
            return Backbone.Model.prototype.get.call(this, attr);
        },*/

        setPartModel: function(model) {
            this.partModel = model;

            this.set('title', this.partModel.get('title'));
            this.set('image', this.partModel.get('image'));
            this.set('url', this.partModel.get('url'));
        }
    });

    return HotspotModel;
});
