(function (root, factory) {
    if (typeof exports === 'object') {
        //commonJS
        factory(exports, window);
    }
    else if (typeof define === 'function' && define.amd) {
        //AMD. Register as an anonymous module.
        define(['exports'], factory.bind(this, window));
    }
    else {
        // Browser globals
        factory((root.commonJsStrict = {}), window);
    }
}(this, function (exports, window) {

