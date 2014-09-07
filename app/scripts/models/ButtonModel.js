define([
    'backbone'
], function (Backbone) {
    'use strict';

    var ButtonModel = Backbone.Model.extend({
        defaults: {
            label: '',
            value: ''
        }
    });

    return ButtonModel;
});
