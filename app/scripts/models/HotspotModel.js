/*global define*/

define([
    'underscore',
    'backbone'
], function (_, Backbone) {
    'use strict';

    var HotspotModel = Backbone.Model.extend({
        defaults: {
            id: '',
            x: 0,
            y: 0,
            title: '',
            asin: '',
            url: 'http://www.amazon.com'
        },

        initialize: function() {
            this.set('url', 'http://www.amazon.com/exec/obidos/ASIN/' + this.get('asin'));
        },

        validate: function(attrs, options) {
        },

        parse: function(response, options)  {
            console.log('HotspotModel.parse()');
            return response;
        }
    });

    return HotspotModel;
});
