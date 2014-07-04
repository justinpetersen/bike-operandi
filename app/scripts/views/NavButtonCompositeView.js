define([
    'marionette',
    'views/NavButtonItemView'
], function (Marionette, NavButtonItemView) {
    'use strict';

    var NavButtonCompositeView = Marionette.CompositeView.extend({
    	itemView: NavButtonItemView,

        itemViewContainer: 'ul',

        template: JST['app/scripts/templates/NavButtonComposite.ejs']
    });

    return NavButtonCompositeView;
});