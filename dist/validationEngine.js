/*! ValidationEngine v0.0.1 - 2014-12-01 
Author: Sujesh Arukil*/
(function (root, factory) {
    if (typeof exports === 'object') {
        //commonJS
        factory(window, exports, require('lodash'));
    }
    else if (typeof define === 'function' && define.amd) {
        //AMD. Register as an anonymous module.
        define(['exports', 'lodash'], factory.bind(this, window));
    }
    else {
        // Browser globals
        factory(window, (root.commonJsStrict = {}), window._);
    }
}(this, function (window, exports, _) {


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
(function (global, _) {
    'use strict';
    global.validationEngine = global.validationEngine || {};

    var validationEngine = global.validationEngine,
        validators = global.validationEngine.validators,
        requiredValidator = {
            validate: function (value) {
                return !_.isEmpty(value);
            },
            message: 'This field is required.'
        };
    validationEngine.validators = validationEngine.validators || {};

    validationEngine.validators.required = requiredValidator;

}(window, _));
(function (global) {
    'use strict';

    var validationEngine = global.validationEngine || {},
        validators = [],
        messages = [],
        config,
        validate,
        hasErrors,
        getMessages,
        configure,
        assign,
        addValidators;

    assign = function (object, source, customizer) {
        var index = 0,
            key,
            props = Object.keys(source),
            length = props.length;

        while (index < length) {
            key = props[index];
            object[key] = customizer ? customizer(object[key], source[key], key, object, source) : source[key];
            index += 1;
        }
        return object;
    };

    configure = function (configuration) {
        config = configuration;
    };

    addValidators = function (allValidators) {
        validators = allValidators;
    };

    validate = function (dataObjectToValidate) {
        var data,
            msg,
            type,
            checker,
            resultOK,
            keys;

        messages.length = 0;

        keys = Object.keys(dataObjectToValidate);
        keys.forEach(function (k) {
            var validatorConfig = config[k],
                message,
                fieldValidators;

            if (!validatorConfig) {
                return;
            }

            fieldValidators = Object.keys(validatorConfig);

            if (!fieldValidators.length) {
                return;
            }

            fieldValidators.forEach(function (v) {
                var validator = validators[v],
                    message,
                    vconfig = validatorConfig[v].options;

                if (!validator) {
                    throw 'Validation handler not specified';
                }

                message = vconfig.message || validator.message;

                resultOK = validator.validate(dataObjectToValidate[k], vconfig);
                dataObjectToValidate.validation = dataObjectToValidate.validation || {};
                dataObjectToValidate.validation[k] = {};

                if (!resultOK) {
                    dataObjectToValidate.validation[k].isValid = false;
                    dataObjectToValidate.validation[k].message = message;
                    messages.push(message);
                } else {
                    dataObjectToValidate.validation[k].isValid = true;
                    dataObjectToValidate.validation[k].message = undefined;
                }
            });
        });
    };

    hasErrors = function () {
        return !!messages.length;
    };

    getMessages = function () {
        return messages;
    };

    assign(validationEngine, {
        configure: configure,
        validate: validate,
        hasErrors: hasErrors,
        getMessages: getMessages,
        addValidators: addValidators
    });

}(window));
(function (global) {
    'use strict';

    global.validationEngine.addValidators(global.validationEngine.validators);

}(window));

    return window.validationEngine;
}));