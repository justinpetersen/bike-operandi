/*global require*/
'use strict';

require.config({
    paths: {
        backbone: '../bower_components/backbone/backbone',
        backfire: '../bower_components/backfire/backbone-firebase',
        bootstrap: '../bower_components/sass-bootstrap/dist/js/bootstrap',
        firebase: '../bower_components/firebase/firebase',
        'firebase-simple-login': '../bower_components/firebase-simple-login/firebase-simple-login',
        isotope: '../bower_components/isotope/dist/isotope.pkgd',
        jquery: '../bower_components/jquery/dist/jquery',
        'jquery.carousel.fullscreen': '../scripts/helpers/jquery.carousel.fullscreen',
        marionette: '../bower_components/marionette/lib/backbone.marionette',
        underscore: '../bower_components/underscore/underscore'
    },
  shim: {
    backbone: {
        deps: ['jquery', 'underscore'],
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
    marionette : {
        deps : ['backbone'],
        exports: 'Backbone.Marionette'
    },
    underscore: {
      exports: '_'
    }
  }
});

require([
    'BikeApplication'
], function(application) {
    application.start();
});