/*global require*/
'use strict';

require.config({
    paths: {
        jquery: '../bower_components/jquery/dist/jquery',
        underscore: '../bower_components/underscore/underscore',
        backbone: '../bower_components/backbone/backbone',
        // 'backbone.localStorage': '../bower_components/backbone.localStorage/backbone.localStorage',
        bootstrap: '../bower_components/sass-bootstrap/dist/js/bootstrap',
        'jquery.carousel.fullscreen': '../scripts/helpers/jquery.carousel.fullscreen',
        firebase: '../bower_components/firebase/firebase',
        'firebase-simple-login': '../bower_components/firebase-simple-login/firebase-simple-login',
        'backfire': '../bower_components/backfire/backbone-firebase',
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
        'firebase-simple-login'
    ], function($, Backbone, Firebase) {

    // console.log('$: ' + $);
    // console.log('Backbone: ' + Backbone);
    // console.log('Firebase: ' + Firebase);

    var Bike = Backbone.Model.extend({
        defaults: {
            title: '',
            image: ''
        }
    })

    var BikeCollection = Backbone.Firebase.Collection.extend({
      model: Bike,
      firebase: new Firebase("https://bike-operandi.firebaseio.com/bikes")
    });

    var BikeView = Backbone.View.extend({
        tagname: 'div',
        attributes: {class: 'item'},
        template: _.template($('#item-template').html()),

        render: function() {
            $(this.el).html(this.template(this.model.toJSON()));
            return this;
        }
    });

    var AppView = Backbone.View.extend({
        bikes: [],

        initialize: function(bikes) {
            this.bikes = bikes;
            this.listenTo(this.bikes, 'all', this.render);
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