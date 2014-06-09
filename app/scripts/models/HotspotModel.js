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
            url: 'http://www.amazon.com/gp/product/0439784549?ie=UTF8&creativeASIN=0439784549&link_code=as3&tag=bikeoper-20&creative=373489&camp=211189'
        },

        initialize: function() {
        },

        validate: function(attrs, options) {
        },

        parse: function(response, options)  {
            return response;
        }
    });

    return HotspotModel;
});
