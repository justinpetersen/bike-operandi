define([
    'marionette',
    'views/NavButtonItemView'
], function (Marionette, NavButtonItemView) {
    'use strict';

    var NavButtonCompositeView = Marionette.CompositeView.extend({
    	itemView: NavButtonItemView,

        itemViewContainer: 'ul',

        template: JST['app/scripts/templates/NavButtonComposite.ejs'],

        onNavButtonClick: function(event) {
            this.trigger('onNavButtonClick', event);
            for (var i=0; i<this.collection.length; i++) {
                this.collection.at(i).set('active', event.model.get('id') == this.collection.at(i).get('id'));
            }
        },

        initialize: function() {
            this.on('itemview:onClick', $.proxy(this.onNavButtonClick, this));
        }
    });

    return NavButtonCompositeView;
});