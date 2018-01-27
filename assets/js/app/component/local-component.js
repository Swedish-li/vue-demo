define([
    'require',
    TEMPLATE_BASE_URL + 'local-component.html'
], function (require, localComponentTemplate) {
    'use strict';
    const local = {
        template: '<h1>This ia local component!</h1>'
    }

    return {
        template: localComponentTemplate,
        components: {
            'new-component': local
        }
    }
});