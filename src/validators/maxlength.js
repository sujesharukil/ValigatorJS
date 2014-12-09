/*global validationEngine*/

var maxlengthValidator = {
    validate: function (value, options) {
        var valueToValidate;

        if (value === null || value === undefined) {
            return true;
        }

        if (Array.isArray(value)) {
            valueToValidate = value;
        } else {
            valueToValidate = value.toString().trim();
        }

        if (valueToValidate === '') {
            return true;
        }

        return valueToValidate.length <= parseFloat(options.maxlength, 10);
    },
    message: 'The field should be no greater than %s'
};

validationEngine.validators.maxlength = maxlengthValidator;
