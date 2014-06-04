/*global require*/
'use strict';

require.config({
    paths: {
        backbone: '../bower_components/backbone/backbone',
        backfire: '../bower_components/backfire/backbone-firebase',
        bootstrap: '../bower_components/sass-bootstrap/dist/js/bootstrap',
        firebase: '../bower_components/firebase/firebase',
        'firebase-simple-login': '../bower_components/firebase-simple-login/firebase-simple-login',
        jquery: '../bower_components/jquery/dist/jquery',
        'jquery.carousel.fullscreen': '../scripts/helpers/jquery.carousel.fullscreen',
        underscore: '../bower_components/underscore/underscore'
    },
  shim: {
    backbone: {
        deps: ['underscore', 'jquery'],
        exports: 'Backbone'
    },
    backfire: {
        deps: ['backbone', 'firebase'],
        exports: 'Backbone'
    },
    bootstrap: {
        deps: ['jquery'],
        exports: 'jquery'
    },
    firebase: {
        exports: 'Firebase'
    },
    'firebase-simple-login': {
        deps: ['firebase'],
        exports: 'Firebase'
    },
    underscore: {
      exports: "_"
    }
  }
});

require([
    'collections/BikeCollection',
    'views/AppView'
], function(BikeCollection, AppView) {
    var bikes = new BikeCollection();
    var appView = new AppView(bikes);
});