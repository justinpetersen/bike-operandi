define([
    'marionette'
], function (Marionette) {
    'use strict';

    var AddPartLayout = Marionette.Layout.extend({
        template: JST['app/scripts/templates/AddPartLayout.ejs'],

        onRender: function() {
            $('#add-part-modal').on('hidden.bs.modal', $.proxy(this.onModalHidden, this));
        },

        onModalHidden: function() {
            this.trigger('onModalHidden');
        },

        showModal: function() {
            $('#add-part-modal').modal('show');
        }
    });

    return AddPartLayout;
});