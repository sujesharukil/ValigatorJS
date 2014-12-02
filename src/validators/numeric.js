(function (global, _) {
    'use strict';
    global.validationEngine = global.validationEngine || {};

    var validationEngine = global.validationEngine,
        validators = global.validationEngine.validators,
        numericValidator = {
            validate: function (value, options) {
                options = options || {};
                if (value === '') {
                    return true;
                }
                var separator = options.separator || '.';
                if (separator !== '.') {
                    value = value.replace(separator, '.');
                }

                return !_.isNaN(parseFloat(value, 10)) && _.isFinite(value);
            },
            message: 'This field is not a valid number.'
        };

    validationEngine.validators = validationEngine.validators || {};

    validationEngine.validators.numeric = numericValidator;

}(window, _));