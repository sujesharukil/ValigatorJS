/*global describe, expect, it, validationEngine */

describe('minlength validator', function () {
	'use strict';

	var minlengthValidator = validationEngine.validators.minlength;

	it('should check that the value is equal to or greater than a specified minmum value', function () {

		expect(minlengthValidator.validate(undefined, { minlength: 2 })).to.equal(false);
		expect(minlengthValidator.validate('', { minlength: 2 })).to.equal(false);
		expect(minlengthValidator.validate('           ', { minlength: 2 })).to.equal(false);
		expect(minlengthValidator.validate('12345678901', { minlength: 2 })).to.equal(true);
		expect(minlengthValidator.validate('   12345        ', { minlength: 2 })).to.equal(true);
		expect(minlengthValidator.validate('   12345678901        ', { minlength: 2 })).to.equal(true);
	});
});
