/*global require*/
'use strict';

require.config({
    paths: {
        jquery: '../bower_components/jquery/dist/jquery',
        underscore: '../bower_components/underscore/underscore',
        backbone: '../bower_components/backbone/backbone',
        'backbone.localStorage': '../bower_components/backbone.localStorage/backbone.localStorage',
        'backbone.tabletopSync': '../scripts/helpers/backbone.tabletopSync',
        tabletop: '../bower_components/tabletop/src/tabletop',
        bootstrap: '../bower_components/sass-bootstrap/dist/js/bootstrap'
    },
  shim: {
    underscore: {
      exports: "_"
    },
    tabletop: {
        deps: [],
        exports: 'Tabletop'
    }
    // bootstrap: {
    //     deps: ['jquery'],
    //     exports: 'jquery'
    // }
  }
});

require([
        'jquery',
        'tabletop',
        'backbone.tabletopSync',
        'models/Todo',
        'views/MasterView'
    ], function($, Tabletop, Backbone, Todo, MasterView ) {

    // console.log('Tabletop: ' + Tabletop);
    // console.log('Backbone: ' + Backbone);
    // console.log('Backbone.tabletopSync' + Backbone.tabletopSync);
    Tabletop.init( { key: '0AmYzu_s7QHsmdDNZUzRlYldnWTZCLXdrMXlYQzVxSFE',
                   callback: function(data, tabletop) { console.log(data) },
                   simpleSheet: true } );

    var Router = Backbone.Router.extend({
            routes: {
            "": "main"
        },

        main: function(){
            var tasks = new Todo.Collection();
            var view = new MasterView({collection: tasks});
            tasks.fetch({
                success: function(tasks){
                    $("#container").html(view.render().el).show();
                },
                error: function(model, error) {
                    // TODO: handle errors nicer
                    alert(error);
                }
            });
        }
    });

    // Preload CSS Sprite
    $('<img/>').attr('src', "./styles/glyphicons.png");

    var router = new Router();
    Backbone.history.start();
 
});