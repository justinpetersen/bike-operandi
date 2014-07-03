define([
    'backbone'
], function (Backbone) {
    'use strict';

    var PartModel = Backbone.Model.extend({
        defaults: {
            id: '',
            image: '',
            title: '',
            url: '#'
        },

        onAdd: function() {
            this.setDefaults();
        },

        initialize: function() {
            this.listenTo(this, 'add', this.onAdd);
        },

        setDefaults: function() {
            if (this.get('url') == null || this.get('url') == this.defaults.url) {
                this.set('url', 'http://www.amazon.com/exec/obidos/ASIN/' + this.get('id') + '?tag=bikeoper-20');
            }
            if (this.get('image') == null || this.get('image') == this.defaults.image) {
                this.set('image', 'http://images.amazon.com/images/P/' + this.get('id') + '.01.MZZZZZZZ.jpg');
            }
        }
    });

    return PartModel;
});
