import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function panValidator(): ValidatorFn {
   const panRegex: RegExp = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
  return (control: AbstractControl): ValidationErrors | null => {
    const valid = panRegex.test(control.value);
    return valid ? null : { invalidFormat: true };
  };
}
