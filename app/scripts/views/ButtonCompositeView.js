define([
    'marionette',
    'views/ButtonItemView'
], function (Marionette, ButtonItemView) {
    'use strict';

    var ButtonCompositeView = Marionette.CompositeView.extend({
    	itemView: ButtonItemView,

        itemViewContainer: 'div',

        template: JST['app/scripts/templates/ButtonComposite.ejs'],

        onButtonClick: function(event) {
            this.trigger('onButtonClick', event);
        },

        initialize: function() {
            this.on('itemview:onClick', $.proxy(this.onButtonClick, this));
        }
    });

    return ButtonCompositeView;
});