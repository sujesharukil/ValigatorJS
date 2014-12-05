/*global validationEngine*/

var maxlengthValidator = {
	validate: function (value, options) {

		if(!value || value === ''){
			return true;
		}

		return parseFloat(value, 10) <= parseFloat(options.maxlength, 10);
	},
	message: 'The field should be no greater than %s'
};

validationEngine.validators.maxlength = maxlengthValidator;
