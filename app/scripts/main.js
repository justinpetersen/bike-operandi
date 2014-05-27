/*global require*/
'use strict';

require.config({
    paths: {
        jquery: '../bower_components/jquery/dist/jquery',
        backbone: '../bower_components/backbone/backbone',
        underscore: '../bower_components/underscore/underscore',
        bootstrap: '../bower_components/sass-bootstrap/dist/js/bootstrap',
        tabletop: '../bower_components/tabletop/src/tabletop',
        'backbone.tabletopSync': '../scripts/helpers/backbone.tabletopSync'
    },
    shim: {
        bootstrap: {
            deps: ['jquery'],
            exports: 'jquery'
        },
        tabletop: {
            deps: [],
            exports: 'Tabletop'
        },
        'backbone.tabletopSync': {
            deps: [],
            exports: 'Backbone'
        }
    }
});

require([
    'tabletop',
    'backbone.tabletopSync'
], function (Tabletop, Backbone) {
    console.log('Tabletop: ' + Tabletop);
    console.log('Backbone: ' + Backbone);
    console.log('Backbone.tabletopSync' + Backbone.tabletopSync);
    Tabletop.init( { key: '0AmYzu_s7QHsmdDNZUzRlYldnWTZCLXdrMXlYQzVxSFE',
                   callback: function(data, tabletop) { console.log(data) },
                   simpleSheet: true } );
    Backbone.history.start();
});
