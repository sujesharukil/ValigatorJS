/*global describe, expect, it, validationEngine */

describe('Min Validator', function(){
    var minValidator = validationEngine.validators.min;
    
    it('should check that the value is greater than a specified minimum value', function(){
        expect(minValidator.validate(10, {
            min: 10
        })).to.equal(true);
    });
});