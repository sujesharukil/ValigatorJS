/*global validationEngine*/

var minlengthValidator = {
	validate: function (value, options) {

		if (!value) {
			return false;
		}

		return value.trim().length >= parseFloat(options.minlength, 10);
	},
	message: 'The field should be equal to or greater than %s'
};

validationEngine.validators.minlength = minlengthValidator;
