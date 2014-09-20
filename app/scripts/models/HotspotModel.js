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
            // The following properties are accessed from the PartModel in the custom getters below
            title: '',
            image: '',
            url: '#'
        },

        partModel: null,

        title: function() {
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
        },

        setPartModel: function(model) {
            this.partModel = model;
        }
    });

    return HotspotModel;
});
