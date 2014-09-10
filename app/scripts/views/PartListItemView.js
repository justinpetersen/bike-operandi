define([
    'views/PartItemView'
], function (PartItemView) {
    'use strict';

    var PartListItemView = PartItemView.extend({
        attributes: { 'class': 'part-container col-lg-3 col-sm-4 col-xs-12' },
    });

    return PartListItemView;
});