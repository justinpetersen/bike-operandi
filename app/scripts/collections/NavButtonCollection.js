define([
    'backbone',
    'models/NavButtonModel'
], function (Backbone, NavButtonModel) {
    'use strict';

    var NavButtonCollection = Backbone.Collection.extend({
        model: NavButtonModel
    });

    return NavButtonCollection;
});
