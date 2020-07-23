import { ValidatorFn, AbstractControl, FormGroup, ValidationErrors, FormControl } from '@angular/forms';

export class CustomeValidator {

  errorMessages: any;

  formRules = {
    nonEmpty: '^[a-zA-Z0-9]+([_ -]?[a-zA-Z0-9])*$',
    usernameMin: 5,
    passwordMin: 6,
    passwordPattern: '(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{6,}'
  };

  formErrors = {
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    accept: false,
  };

  constructor() {
    this.errorMessages = {
      firstName: {
        required: 'First name is required',
      },
      lastName: {
        required: 'Last name is required',
      },
      username: {
        required: 'Username is required',
        minLength: `'Username must be ${this.formRules.usernameMin} characters or more`
      },
      email: {
        required: 'required',
        email: 'Invalid email address',
      },
      password: {
        required: 'Password is required',
        pattern: 'Password must contain: numbers, uppercase and lowercase letters',
        minLength: this.formRules.passwordMin.toString()
      },
      confirmPassword: {
        required: 'Password confirmation is required',
        passwordMismatch: 'Passwords must match'
      },
      accept: {
        requiredTrue: 'You have to accept our Terms and Conditions'
      }
    };
  }
}

export function onlyNumeric(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    let nameRe: RegExp = new RegExp('^[0-9]*$');
    const forbidden = nameRe.test(control.value);
    return !forbidden ? { 'onlyNumeric': { value: control.value } } : null;
  };
}

export const confirmPasswordValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
  const password = control.get('newPassword');
  const confirm = control.get('confirmPassword');
  return password && confirm && password.value === confirm.value ? null : { 'passwordMismatch': true };
};

export const trimValidator: ValidatorFn = (control: FormControl) => {
  if (control.value.startsWith(' ')) {
    return {
      'trimError': { value: 'Field has leading whitespace' }
    };
  }
  if (control.value.endsWith(' ')) {
    return {
      'trimError': { value: 'Field has trailing whitespace' }
    };
  }
  return null;
};

export function nidValidation(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    let controlVal = control.value.toString();
    let forbidden;
    if (!(controlVal.length === 10 || controlVal.length === 13 || controlVal.length === 17)) {
      forbidden = true;
    }
    return forbidden ? { 'forbiddenName': { value: control.value } } : null;
  };
}
