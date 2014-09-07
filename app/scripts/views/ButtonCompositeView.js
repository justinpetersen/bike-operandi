define([
    'marionette',
    'views/ButtonItemView'
], function (Marionette, ButtonItemView) {
    'use strict';

    var ButtonCompositeView = Marionette.CompositeView.extend({
    	itemView: ButtonItemView,

        itemViewContainer: 'div',

        template: JST['app/scripts/templates/ButtonComposite.ejs']
    });

    return ButtonCompositeView;
});