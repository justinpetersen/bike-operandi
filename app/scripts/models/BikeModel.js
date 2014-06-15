define([
    'underscore',
    'backbone',
    'models/HotspotModel',
    'collections/HotspotCollection'
], function (_, Backbone, HotspotModel, HotspotCollection) {
    'use strict';

    var BikeModel = Backbone.Model.extend({
        defaults: {
            title: '',
            image: '',
            tags: '',
            hotspots: []
        },

        initialize: function(attrs, options) {
            this.parseHotspots(attrs.hotspots);
        },

        validate: function(attrs, options) {
        },

        parse: function(response, options)  {
            return response;
        },

        parseHotspots: function(hotspotArray) {
            this.set('hotspots', new HotspotCollection());
            for (var i=0; i<hotspotArray.length; i++) {
                var hotspot = new HotspotModel(hotspotArray[i]);
                hotspot.set('id', 'hotspot-' + i);
                this.get('hotspots').add(hotspot);
            }
        }
    });

    return BikeModel;
});
