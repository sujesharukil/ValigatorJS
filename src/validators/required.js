(function (global) {
    'use strict';
    global.validationEngine = global.validationEngine || {};

    var validationEngine = global.validationEngine,
        validators = global.validationEngine.validators,
        requiredValidator = {
            validate: function (value) {
                return value !== '';
            },
            message: 'This field is required.'
        };
    validationEngine.validators = validationEngine.validators || {};

    validationEngine.validators.required = requiredValidator;

}(window));