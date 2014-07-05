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

        onNavButtonClick: function(event) {
            this.trigger('onNavButtonClick', event);
        },

        showNav: function() {
            var navButtonCollection = new NavButtonCollection([
                { label: 'Bikes', id: 'bikes', active: true },
                { label: 'Components', id: 'parts' }
            ]);
            this.navButtonCompositeView = new NavButtonCompositeView({ collection: navButtonCollection });
            this.listenTo(this.navButtonCompositeView, 'onNavButtonClick', this.onNavButtonClick);
            this.buttons.show(this.navButtonCompositeView);
        }
    });

    return NavLayout;
});