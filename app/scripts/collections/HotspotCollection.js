define([
    'backfire',
    'models/HotspotModel'
], function (Backbone, HotspotModel) {
    'use strict';

    var HotspotCollection = Backbone.Firebase.Collection.extend({
        model: HotspotModel
    });

    return HotspotCollection;
});
