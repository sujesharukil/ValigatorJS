/*global describe, expect, it, validationEngine */

describe('maxlength validator', function () {
    'use strict';

    var maxlengthValidator = validationEngine.validators.maxlength;

    it('should check that the value is no greater than a specified maximum value', function () {
        expect(maxlengthValidator.validate('1', {
            maxlength: 2
        })).to.equal(true);
        expect(maxlengthValidator.validate(['john'], {
            maxlength: 2
        })).to.equal(true);
        expect(maxlengthValidator.validate(['john', 'suj', 'dave'], {
            maxlength: 2
        })).to.equal(false);
        expect(maxlengthValidator.validate(0, {
            maxlength: 2
        })).to.equal(true);

        expect(maxlengthValidator.validate(undefined, {
            maxlength: 10
        })).to.equal(true);

        expect(maxlengthValidator.validate('', {
            maxlength: 10
        })).to.equal(true);

        expect(maxlengthValidator.validate('           ', {
            maxlength: 10
        })).to.equal(true);

        expect(maxlengthValidator.validate('12345678901', {
            maxlength: 10
        })).to.equal(false);

        expect(maxlengthValidator.validate('   12345        ', {
            maxlength: 10
        })).to.equal(true);

        expect(maxlengthValidator.validate('   12345678901        ', {
            maxlength: 10
        })).to.equal(false);
    });
});
