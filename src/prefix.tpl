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

