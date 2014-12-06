/*global validationEngine*/

var maxlengthValidator = {
    validate: function (value, options) {

        if (!value) {
            return true;
        }

        return value.trim().length <= parseFloat(options.maxlength, 10);
    },
    message: 'The field should be no greater than %s'
};

validationEngine.validators.maxlength = maxlengthValidator;
