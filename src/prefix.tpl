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

