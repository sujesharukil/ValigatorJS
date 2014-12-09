/*global validationEngine*/

var minlengthValidator = {
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



        return valueToValidate.length >= parseFloat(options.minlength, 10);
    },
    message: 'The field should be equal to or greater than %s'
};

validationEngine.validators.minlength = minlengthValidator;
