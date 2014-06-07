/*global define*/

define([
    'underscore',
    'backbone',
    'models/HotspotModel'
], function (_, Backbone, HotspotModel) {
    'use strict';

    var HotspotCollection = Backbone.Collection.extend({
        model: HotspotModel
    });

    return HotspotCollection;
});
