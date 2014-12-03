/*global _, validationEngine*/

var requiredValidator = {
    validate: function (value) {
        return !_.isEmpty(value);
    },
    message: 'This field is required.'
};

validationEngine.validators.required = requiredValidator;