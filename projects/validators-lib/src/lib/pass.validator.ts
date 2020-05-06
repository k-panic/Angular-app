import { AbstractControl } from '@angular/forms';

export class PasswordMatchValidator {
  static validate(control: AbstractControl) {
    const password: string = control.get('password').value;
    const confirmPassword: string = control.get('cPassword').value;
    if (password !== confirmPassword) {
      control.get('cPassword').setErrors({ NoPassswordMatch: true });
    }
  }
}
