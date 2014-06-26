define([
    'backfire',
    'models/BikeFilterModel',
    'firebase'
], function (Backbone, BikeFilterModel, Firebase) {
    'use strict';

    var BikeFilterCollection = Backbone.Firebase.Collection.extend({
        model: BikeFilterModel,

        selectedFilters: [],

        selectedFiltersLookup: {},

        clearSelectedFilters: function() {
        	this.selectedFilters = [];
        	this.selectedFiltersLookup = {};
        },

        addSelectedFilter: function(filter) {
        	if (!this.selectedFiltersLookup[filter]) {
        		this.selectedFilters.push(filter);
        		this.selectedFiltersLookup[filter] = true;
        	}
        }
    });

    return BikeFilterCollection;
});
