/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'views/BikeView',
    'jquery.carousel.fullscreen'
], function ($, _, Backbone, JST, BikeView) {
    'use strict';

    var AppView = Backbone.View.extend({
        // template: JST['app/scripts/templates/App.ejs'],

        tagName: 'div',

        id: '',

        className: '',

        events: {},

        bikes: [],

        onSync: function() {
            this.render();
        },

        initialize: function (bikes) {
            this.bikes = bikes;
            this.listenTo(this.bikes, 'sync', this.onSync);
        },

        render: function () {
            for (var i=0; i<this.bikes.length; i++) {
                var bike = new BikeView({ model: this.bikes.at(i) });
                var item = $('#container').append(bike.render().el);
                console.log(this.bikes.at(i).get('hotspots')[0].x + ', ' + this.bikes.at(i).get('hotspots')[0].y);
            }

            $('#container').children().first().addClass('active');

            // TODO: Improve the structure of bootstrap.carousel.fullscreen
            $.carouselFullscreen();
            // $('.carousel').carousel();

            return this;
        }
    });

    return AppView;
});
