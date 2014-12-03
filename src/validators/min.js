/*global validationEngine*/

var minValidator = {
    validate: function (value, options) {
        var numericValidator = validationEngine.validators.numeric;
        if(!numericValidator.validate(value) || !numericValidator.validate(options.min)){
            return false;
        }
        
        if(value === ''){
            return true;
        }
        
        return parseFloat(value, 10) >= parseFloat(options.min, 10);
    },
    message: 'The field should be greater than %s'
};

validationEngine.validators.min = minValidator;