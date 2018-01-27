define([
    TEMPLATE_BASE_URL + 'simple-counter-template.html',
], function (template) {
    'use strict';
    return {
        template: template,
        data: function () {
            return { count: 0 }
        }
    }
});