define([
    'backbone',
    'models/ButtonModel'
], function (Backbone, ButtonModel) {
    'use strict';

    var ButtonCollection = Backbone.Collection.extend({
        model: ButtonModel
    });

    return ButtonCollection;
});
