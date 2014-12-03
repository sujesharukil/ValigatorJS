/*global describe, expect, it, validationEngine */

describe('Numeric Validator', function () {
    var numericValidator = validationEngine.validators.numeric;

    it('should check for a valid numeric value', function () {
        expect(numericValidator.validate(123)).to.equal(true);
        expect(numericValidator.validate(123.00)).to.equal(true);
        expect(numericValidator.validate('123')).to.equal(true);
        expect(numericValidator.validate('123.00')).to.equal(true);
        expect(numericValidator.validate(-123)).to.equal(true);
        expect(numericValidator.validate(-123.00)).to.equal(true);
        expect(numericValidator.validate('-123')).to.equal(true);
        expect(numericValidator.validate('-123.00')).to.equal(true);
        expect(numericValidator.validate('abc')).to.equal(false);
        expect(numericValidator.validate('123abc')).to.equal(false);
        expect(numericValidator.validate('123-123')).to.equal(false);
        expect(numericValidator.validate('01/01/2010')).to.equal(false);
        expect(numericValidator.validate('')).to.equal(true);
        expect(numericValidator.validate(undefined)).to.equal(false);
    });

    it('should define a default message', function () {
        expect(numericValidator.message).to.equal('This field is not a valid number.');
    });
});