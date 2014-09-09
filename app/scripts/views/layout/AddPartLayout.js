define([
    'marionette'
], function (Marionette) {
    'use strict';

    var AddPartLayout = Marionette.Layout.extend({
        template: JST['app/scripts/templates/AddPartLayout.ejs'],

        onRender: function() {
            $('#bike-detail-modal').on('hidden.bs.modal', $.proxy(this.onModalHidden, this));
        },

        onModalHidden: function() {
            this.trigger('onModalHidden');
        },

        showModal: function() {
            $('#bike-detail-modal').modal('show');
        }
    });

    return AddPartLayout;
});