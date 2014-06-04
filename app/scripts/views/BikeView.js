/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates'
], function ($, _, Backbone, JST) {
    'use strict';

    var BikeView = Backbone.View.extend({
        template: JST['app/scripts/templates/Bike.ejs'],

        tagName: 'div',

        id: '',

        className: '',

        attributes: {class: 'item'},

        events: {},

        initialize: function () {
            this.listenTo(this.model, 'change', this.render);
        },

        render: function () {
            this.$el.html(this.template(this.model.toJSON()));

            return this;
        }
    });

    return BikeView;
});
