define([
    'backbone'
], function (Backbone) {
    'use strict';

    var NavButtonModel = Backbone.Model.extend({
        defaults: {
            id: '',
            label: '',
            active: false
        }
    });

    return NavButtonModel;
});
