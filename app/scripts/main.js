/*global require*/
'use strict';

require.config({
    paths: {
        jquery: '../bower_components/jquery/dist/jquery',
        underscore: '../bower_components/underscore/underscore',
        backbone: '../bower_components/backbone/backbone',
        'backbone.localStorage': '../bower_components/backbone.localStorage/backbone.localStorage',
        'backbone.tabletopSync': '../scripts/helpers/backbone.tabletopSync',
        tabletop: '../bower_components/tabletop/src/tabletop'
        // bootstrap: '../bower_components/sass-bootstrap/dist/js/bootstrap'
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
    ], function($, Tabletop, Backbone, Todo, MasterView) {

    // console.log('Tabletop: ' + Tabletop);
    // console.log('Backbone: ' + Backbone);
    // console.log('Backbone.tabletopSync' + Backbone.tabletopSync);
    // Tabletop.init({key: '0AmYzu_s7QHsmdE5OcDE1SENpT1g2R2JEX2tnZ3ZIWHc',
    //         callback: function(data, tabletop) {
    //             console.log(data);
    //         },
    //         simpleSheet: true});

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

    var public_spreadsheet_url = 'https://docs.google.com/spreadsheet/pub?hl=en_US&hl=en_US&key=0AmYzu_s7QHsmdE5OcDE1SENpT1g2R2JEX2tnZ3ZIWHc&output=html';

    /* 
    You need to declare the tabletop instance separately, then feed it into the model/collection
    You *must* specify wait: true so that it doesn't try to fetch when you initialize
    */
    var storage = Tabletop.init( { key: public_spreadsheet_url,
                                  wait: true } );

    /*
    Need to specify that you'd like to sync using Backbone.tabletopSync
    Can specify tabletop attributes, or you can do it on the collection
    */
    var Cat = Backbone.Model.extend({
        idAttribute: 'name',
        tabletop: {
            instance: storage,
            sheet: 'Cats'
        },
        sync: Backbone.tabletopSync
    });

    /*
    Need to specify that you'd like to sync using Backbone.tabletopSync
    Need to specify a tabletop key and sheet
    */
    var CatCollection = Backbone.Collection.extend({
        // Reference to this collection's model.
        model: Cat,
        tabletop: {
            instance: storage,
            sheet: 'Cats'
        },
        sync: Backbone.tabletopSync
    });

    var CatView = Backbone.View.extend({
        tagname: 'div',
        template: _.template($('#cat-template').html()),

        render: function() {
            $(this.el).html(this.template(this.model.toJSON()));
            return this;
        }
    });

    /*
    You need to initialize Tabletop before you do aaaaanything.
    You might think it'd be a good idea to put that into backbone.tabletopSync,
      but IMHO the fact that you could put the key/url into any model anywhere
      ever sounds like trouble.
    */
    // $(document).ready( function() {
        var cats = new CatCollection();
        cats.fetch({ success: showInfo });
    // });

    function showInfo(cats) {
        for (var i=0; i<cats.length; i++) {
            var cat = new CatView({ model: cats.at(i) });
            $("#container").append(cat.render().el);
        }

        // var bosco_view = new CatView({ model: cats.get('Bosco') });

        // $("#content").append( bosco_view.render().el );

        
        //   Fetching on models works as long as you've specified a sheet
        //   and an idAttribute for the Backbone.Model (you can always
        //   use rowNumber, it comes baked in to Tabletop)
        
        // var thomas = new Cat({name: 'Thomas'});
        // thomas.fetch();

        // var thomas_view = new CatView({ model: thomas });
        // $("#content").append( thomas_view.render().el );
    }
 
});