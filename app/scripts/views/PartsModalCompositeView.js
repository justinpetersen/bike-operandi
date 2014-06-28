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

        onRender: function() {
            $('#parts-modal').on('hidden.bs.modal', $.proxy(this.onModalHidden, this));
        },

        onModalHidden: function() {
            this.trigger('onModalHidden');
        },

        showModal: function() {
            $('#parts-modal').modal('show');
        }
    });

    return PartsModalCompositeView;
});