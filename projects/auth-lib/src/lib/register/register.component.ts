import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'projects/service-lib/src/public-api';
// import * as customValidator from 'validators-lib';

@Component({
  selector: 'auth-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder, 
    private router: Router,) { 
      this.formCreation();
    }

  ngOnInit(): void {
    
  }

  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    const values = this.registerForm.value;
    if (values['password'] === values['cPassword']) {
      this.authService.register(values['email'], values['password']).subscribe(
        data => {
          if (data['error'])  {
            console.log("error =====>",data['error']);
            return;
          }
          console.log('successfully created');
          this.router.navigate['auth/login'];
        }
      );
    }
  }

  validator(control: AbstractControl) {
    const password: string = control.get('password').value;
    const confirmPassword: string = control.get('cPassword').value;
    if (password !== confirmPassword) {
      control.get('cPassword').setErrors({ NoPassswordMatch: true });
    }
  }

  formCreation()  {
    this.registerForm = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
        cPassword: ['', Validators.required],
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        birthDate: [Date.now(), Validators.required],
        city: ['Conakry', Validators.required]
      },
      {
        validator: this.validator
      }
      // },
      // {
      //   validator: customValidator.PasswordMatchValidator.validate
      // }
    );
  }

}
