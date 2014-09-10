define([
    'marionette',
    'collections/PartCollection'
], function (Marionette, PartCollection) {
    'use strict';

    var AddPartLayout = Marionette.Layout.extend({
        template: JST['app/scripts/templates/AddPartLayout.ejs'],

        partCollection: null,

        triggers: {
            'click #part-add-save-button': 'onSaveClick',
        },

        onSaveClick: function() {
            this.saveFormValues();
        },

        onRender: function() {
            $('#add-part-modal').on('hidden.bs.modal', $.proxy(this.onModalHidden, this));
        },

        onModalHidden: function() {
            this.trigger('onModalHidden');
        },

        initialize: function() {
            this.listenTo(this, 'onSaveClick', this.onSaveClick);
        },

        showModal: function( partCollection ) {
            this.partCollection = partCollection;
            $('#add-part-modal').modal('show');
        },

        saveFormValues: function() {
            this.partCollection.add({
                id: this.$el.find('#input-id').val(),
                image: this.$el.find('#input-image').val(),
                title: this.$el.find('#input-title').val(),
                url: this.$el.find('#input-url').val()
            });

            $('#add-part-modal').modal('hide');
        }
    });

    return AddPartLayout;
});