define([
    'backbone',
    'models/HotspotModel'
], function (Backbone, HotspotModel) {
    'use strict';

    var HotspotCollection = Backbone.Collection.extend({
        model: HotspotModel
    });

    return HotspotCollection;
});
