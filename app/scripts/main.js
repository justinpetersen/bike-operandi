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
        bootstrap: '../bower_components/sass-bootstrap/dist/js/bootstrap',
        'jquery.carousel.fullscreen': '../scripts/helpers/jquery.carousel.fullscreen'
    },
  shim: {
    underscore: {
      exports: "_"
    },
    tabletop: {
        deps: [],
        exports: 'Tabletop'
    },
    bootstrap: {
        deps: ['jquery'],
        exports: 'jquery'
    }

  }
});

require([
        'jquery.carousel.fullscreen',
        'tabletop',
        'backbone.tabletopSync',
        'models/Todo',
        'views/MasterView'
    ], function($, Tabletop, Backbone, Todo, MasterView) {

    // return;

    // console.log('Tabletop: ' + Tabletop);
    // console.log('Backbone: ' + Backbone);
    // console.log('Backbone.tabletopSync' + Backbone.tabletopSync);
    // Tabletop.init({key: '0AmYzu_s7QHsmdE5OcDE1SENpT1g2R2JEX2tnZ3ZIWHc',
    //         callback: function(data, tabletop) {
    //             console.log(data);
    //         },
    //         simpleSheet: true});

    var public_spreadsheet_url = 'https://docs.google.com/spreadsheets/d/1qfVHafHl01zYduxnwdHdjL1HN_3ljSF2UU5bZyJ0PWY/pubhtml';

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
        defaults: {
            title: '',
            image: ''
        },
        tabletop: {
            instance: storage,
            sheet: 'bikes'
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
            sheet: 'bikes'
        },
        sync: Backbone.tabletopSync
    });

    var CatView = Backbone.View.extend({
        tagname: 'div',
        attributes: {class: 'item'},
        template: _.template($('#item-template').html()),

        render: function() {
            $(this.el).html(this.template(this.model.toJSON()));
            return this;
        }
    });

    var cats = new CatCollection();
    cats.fetch({ success: showInfo });

    function showInfo(cats) {
        for (var i=0; i<cats.length; i++) {
            var cat = new CatView({ model: cats.at(i) });
            var item = $('#container').append(cat.render().el);
        }
        console.log($('#container').children().first().addClass);
        $('#container').children().first().addClass('active');
        $.carouselFullscreen();
        // $('.carousel').carousel();
    }
 
});