/*! ValidationEngine v0.0.1 - 2014-12-03 
Author: Sujesh Arukil*/
(function (root, factory) {
    if (typeof require === "function" && typeof exports === "object" && typeof module === "object") {
        //commonJS
        factory(require('lodash'), exports);
    }
    else if (typeof define === 'function' && define.amd) {
        //AMD. Register as an anonymous module.
        define(['lodash', 'exports'], factory);
    }
    else {
        // Browser globals
        factory(root._, root);
    }
}(this, function (_, exports) {
    exports.validationEngine = {
        validators: {}
    };
    
    var validationEngine = exports.validationEngine;


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
var requiredValidator = {
    validate: function (value) {
        return !_.isEmpty(value);
    },
    message: 'This field is required.'
};

validationEngine.validators.required = requiredValidator;
var ValidationEngineCore = function () {
    this.config = {};
    this.validation = {};
};

ValidationEngineCore.prototype.validate = function (dataObjectToValidate) {
    var self = this,
        resultOK,
        keys;
    
    this.resetValidationErrors();
    //retrieve all the keys from the object. This will be utilized to run the appropriate validators from the config
    keys = Object.keys(dataObjectToValidate);

    //loop through each key
    keys.forEach(function (k) {
        var validatorConfig = self.config[k],
            fieldValidators;

        if (!validatorConfig) {
            //did not find a validator, so cannot validate.
            return;
        }

        //get the keys from the validation configuration
        fieldValidators = Object.keys(validatorConfig);

        //if there are no keys, then there are no validators
        if (!fieldValidators.length) {
            return;
        }


        if (self.validation[k] !== undefined && !self.validation[k].isValid) {
            return;
        }

        //loop through the validators and execute
        fieldValidators.forEach(function (v) {
            var validator = self.validators[v],
                message,
                vconfig = validatorConfig[v];

            //if the configured validator is not in the collection, throw exception
            if (validator === undefined) {
                throw Error('Validation handler not specified');
            }

            //create the message that will be displayed if validation fails
            message = vconfig.message || validator.message;
            //execute the validator and retrieve the result
            resultOK = validator.validate(dataObjectToValidate[k], vconfig);


            if (!resultOK) {
                //validation failed
                self.validation[k].isValid = false;
                self.validation[k].messages.push(message);
            }

        });
    });
};

ValidationEngineCore.prototype.hasErrors = function () {
    var item = _.findKey(this.validation, { isValid: false});
    if(item !== undefined && item !== ''){
        return true;
    }
    
    return false;
};

ValidationEngineCore.prototype.configure = function (configuration) {
    _.extend(this.config, configuration);
    this.resetValidationErrors();
};

ValidationEngineCore.prototype.resetValidationErrors = function(){
    var self = this;
    Object.keys(this.config).forEach(function(k){
        self.validation[k] = {
            isValid: true,
            messages: []
        };
    });
};

ValidationEngineCore.prototype.addValidator = function (name, validator) {
    if (typeof validator.validate !== 'function') {
        throw Error('Validator must implement a validate function');
    }

    this.validators[name] = validator;
};

_.extend(validationEngine, ValidationEngineCore.prototype);

validationEngine.init = function () {
    ValidationEngineCore.apply(this);
};

    return exports;
}));