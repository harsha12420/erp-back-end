import { ValidationArguments, ValidationOptions, isNotEmpty, isString, registerDecorator } from 'class-validator';

export function IsNotEmptyString(validationOptions?: ValidationOptions) {
  return (object: unknown, propertyName: string) => {
    registerDecorator({
      name: 'isNotEmptyString',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate: (value: any): boolean => isString(value) && isNotEmpty(value.trim()),
        defaultMessage: (validationArguments?: ValidationArguments): string =>
          `${validationArguments.property} should be a valid string`,
      },
    });
  };
}
