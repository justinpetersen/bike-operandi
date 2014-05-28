/*global require*/
'use strict';

require.config({
    paths: {
        jquery: '../bower_components/jquery/dist/jquery',
        underscore: '../bower_components/underscore/underscore',
        backbone: '../bower_components/backbone/backbone',
        'backbone.localStorage': '../bower_components/backbone.localStorage/backbone.localStorage',
        bootstrap: '../bower_components/sass-bootstrap/dist/js/bootstrap'
    },
  shim: {
    underscore: {
      exports: "_"
    },
    backbone: {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone'
    }
    // bootstrap: {
    //     deps: ['jquery'],
    //     exports: 'jquery'
    // }
    // tabletop: {
    //     deps: [],
    //     exports: 'Tabletop'
    // }
  }
});

// require([
//     'tabletop',
//     'backbone.tabletopSync'
// ], function (Tabletop, Backbone) {
//     console.log('Tabletop: ' + Tabletop);
//     console.log('Backbone: ' + Backbone);
//     console.log('Backbone.tabletopSync' + Backbone.tabletopSync);
//     Tabletop.init( { key: '0AmYzu_s7QHsmdDNZUzRlYldnWTZCLXdrMXlYQzVxSFE',
//                    callback: function(data, tabletop) { console.log(data) },
//                    simpleSheet: true } );
//     Backbone.history.start();

// });

require([
    'jquery',
    'backbone',
    'models/Todo',
    'views/MasterView'
  ], function($, Backbone, Todo, MasterView ) {

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