/*global describe, expect, it, validationEngine */

describe('Core Engine Tests', function () {

    it('should add new validators to its collection', function () {
        var engine = Object.create(validationEngine),
            engine2 = Object.create(validationEngine);

        engine.init();
        engine.addValidator('testValidator', {
            validate: function () {}
        });

        expect(engine2.validators.testValidator).to.not.equal(undefined);
    });

    it('should perform validations', function () {
        var engine = Object.create(validationEngine),
            objectToValidate = {
                firstName: '',
                age: ''
            };

        engine.init();

        engine.configure({
            firstName: {
                required: {
                    message: 'this is required'
                }
            },
            age: {
                required: {
                    message: 'Age is required'
                },
                numeric: {
                    message: 'Age must be a number'
                },
                min: {
                    min: 50,
                    message: 'Age must be greater than 50'
                }
            }
        });

        engine.validate(objectToValidate);

        expect(engine.hasErrors()).to.equal(true);
        
        expect(engine.validation.firstName.isValid).to.equal(false);
        expect(engine.validation.age.isValid).to.equal(false);
        expect(engine.validation.firstName.messages).to.eql(['this is required']);
        expect(engine.validation.age.messages).to.eql(['Age is required']);

        objectToValidate.firstName = 'this is a name';
        objectToValidate.age = 'somestring';

        engine.validate(objectToValidate);

        expect(engine.hasErrors()).to.equal(true);
        expect(engine.validation.firstName.isValid).to.equal(true);
        expect(engine.validation.age.isValid).to.equal(false);
        expect(engine.validation.firstName.messages).to.eql([]);
        expect(engine.validation.age.messages).to.eql(['Age must be a number', 'Age must be greater than 50']);

        objectToValidate.age = '50';
        
        engine.validate(objectToValidate);
        
        expect(engine.hasErrors()).to.equal(false);
        expect(engine.validation.age.isValid).to.equal(true);
        expect(engine.validation.age.messages).to.eql([]);
    });

});