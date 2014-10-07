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
        },

        pruneShowAll: function() {
            var cloneCollection = new Backbone.Collection();
            cloneCollection.selectedFilters = [];
            cloneCollection.selectedFiltersLookup = {};
            cloneCollection.clearSelectedFilters = this.clearSelectedFilters;
            cloneCollection.addSelectedFilter = this.addSelectedFilter;
            for (var i = 0; i<this.length; i++) {
                var model = this.at(i);
                if (model.get('value') != '*') {
                    cloneCollection.add(model);
                }
            }

            return cloneCollection;
        }
    });

    return BikeFilterCollection;
});
