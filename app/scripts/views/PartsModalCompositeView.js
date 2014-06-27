define([
    'jquery',
    'templates',
    'marionette',
    'views/PartItemView'
], function ($, JST, Marionette, PartItemView) {
    'use strict';

    var PartsModalCompositeView = Marionette.CompositeView.extend({
        itemView: PartItemView,

        itemViewContainer: '#parts-container',

        template: JST['app/scripts/templates/PartsModalComposite.ejs'],

        showModal: function() {
            $('#parts-modal').modal('show');
        }
    });

    return PartsModalCompositeView;
});