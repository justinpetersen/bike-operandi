/*global require*/
'use strict';

require.config({
    paths: {
        jquery: '../bower_components/jquery/dist/jquery',
        backbone: '../bower_components/backbone/backbone',
        underscore: '../bower_components/underscore/underscore',
        bootstrap: '../bower_components/sass-bootstrap/dist/js/bootstrap',
        tabletop: '../bower_components/tabletop/src/tabletop',
        'backbone.tabletopSync': '../bower_components/tabletop/src/backbone.tabletopSync'
    },
    shim: {
        bootstrap: {
            deps: ['jquery'],
            exports: 'jquery'
        },
        tabletop: {
            deps: [],
            exports: 'Tabletop'
        }
    }
});

require([
    'tabletop',
    'backbone'
], function (Tabletop, Backbone) {
    console.log('Tabletop: ' + Tabletop);
    console.log('Backbone: ' + Backbone);
    Tabletop.init( { key: '0AmYzu_s7QHsmdDNZUzRlYldnWTZCLXdrMXlYQzVxSFE',
                   callback: function(data, tabletop) { console.log(data) },
                   simpleSheet: true } );
    Backbone.history.start();
});
