/*global require*/
'use strict';

require.config({
    paths: {
        jquery: '../bower_components/jquery/dist/jquery',
        underscore: '../bower_components/underscore/underscore',
        backbone: '../bower_components/backbone/backbone',
        bootstrap: '../bower_components/sass-bootstrap/dist/js/bootstrap',
        'jquery.carousel.fullscreen': '../scripts/helpers/jquery.carousel.fullscreen',
        firebase: '../bower_components/firebase/firebase',
        'firebase-simple-login': '../bower_components/firebase-simple-login/firebase-simple-login',
        'backfire': '../bower_components/backfire/backbone-firebase'
    },
  shim: {
    underscore: {
      exports: "_"
    },
    backbone: {
        deps: ['underscore', 'jquery'],
        exports: 'Backbone'
    },
    bootstrap: {
        deps: ['jquery'],
        exports: 'jquery'
    },
    'firebase-simple-login': {
        deps: ['firebase'],
        exports: 'Firebase'
    },
    backfire: {
        deps: ['backbone', 'firebase'],
        exports: 'Firebase'
    }
  }
});

require([
        'jquery.carousel.fullscreen',
        'backbone',
        'backfire',
        'models/BikeModel',
        'views/BikeView'
    ], function($, Backbone, Firebase, BikeModel, BikeView) {

    var BikeCollection = Backbone.Firebase.Collection.extend({
      model: BikeModel,
      firebase: new Firebase("https://bike-operandi.firebaseio.com/bikes")
    });

    var AppView = Backbone.View.extend({
        bikes: [],

        onSync: function() {
            this.render();
        },

        initialize: function(bikes) {
            this.bikes = bikes;
            this.listenTo(this.bikes, 'sync', this.onSync);
        },

        render: function() {
            for (var i=0; i<this.bikes.length; i++) {
                var bike = new BikeView({ model: this.bikes.at(i) });
                var item = $('#container').append(bike.render().el);
            }

            $('#container').children().first().addClass('active');

            // TODO: Improve the structure of bootstrap.carousel.fullscreen
            $.carouselFullscreen();
            // $('.carousel').carousel();
        }
    });

    var bikes = new BikeCollection();
    var appView = new AppView(bikes);
 
});