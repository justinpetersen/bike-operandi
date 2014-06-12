/*global define*/

define([
    'marionette',
    'collections/BikeCollection',
    'views/BikesView'
], function (Marionette, BikeCollection, BikesCompositeView) {
    'use strict';

    var BikeApplication = new Marionette.Application();

    BikeApplication.addRegions({
        main: '#main-container'
    });

    BikeApplication.addInitializer(function(){
        var bikes = new BikeCollection();

        BikeApplication.main.show(new BikesCompositeView({ collection: bikes }));
    });

    return BikeApplication;
});