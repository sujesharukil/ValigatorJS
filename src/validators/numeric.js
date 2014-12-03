/*global _, validationEngine*/

var numericValidator = {
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

validationEngine.validators.numeric = numericValidator;