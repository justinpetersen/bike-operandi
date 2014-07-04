define([
    'marionette',
    'collections/NavButtonCollection',
    'views/NavButtonCompositeView'
], function (Marionette, NavButtonCollection, NavButtonCompositeView) {
    'use strict';

    var NavLayout = Marionette.Layout.extend({
        template: JST['app/scripts/templates/Nav.ejs'],

        regions: {
            buttons: '#nav-buttons-container'
        },

        navButtonCompositeView: null,

        showNav: function() {
            var navButtonCollection = new NavButtonCollection([
                { label: 'Bikes', id: 'bikes', active: true },
                { label: 'Parts', id: 'parts' },
                { label: 'Add a Bike', id: 'add' }
            ]);
            this.navButtonCompositeView = new NavButtonCompositeView({ collection: navButtonCollection });
            this.buttons.show(this.navButtonCompositeView);
        }
    });

    return NavLayout;
});