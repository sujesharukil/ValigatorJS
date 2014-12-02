describe('Required Validator', function () {
    var requiredValidator = validationEngine.validators.required;

    it('should check a value is not empty', function () {
        var isValid = requiredValidator.validate('test');
        expect(isValid).to.be.true;
        isValid = requiredValidator.validate('');
        expect(isValid).to.be.false;
    });

    it('should check an array is not empty', function () {
        var isValid = requiredValidator.validate([]);
        expect(isValid).to.be.false;
        isValid = requiredValidator.validate([1]);
        expect(isValid).to.be.true;
    });

    it('should have a default message defined', function () {
        expect(requiredValidator.message).to.equal('This field is required.');
    });
});