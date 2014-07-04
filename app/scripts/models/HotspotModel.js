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

        setPartModel: function(model) {
            this.partModel = model;
        }
    });

    return HotspotModel;
});
