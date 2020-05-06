import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'service-lib';

@Component({
  selector: 'auth-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  nextUrl: string;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder, 
    private router: Router, 
    private activeRoute: ActivatedRoute) {
      this.formCreation();
    }

    
  ngOnInit(): void {
    
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    const values = this.loginForm.value;
    this.nextUrl = this.activeRoute.snapshot.queryParams['nextUrl'] || '';
    this.authService.login(values['email'], values['password']).subscribe(
      data => {
        if (data['error'])  {
          console.log("error =====>",data['error']);
          return;
        }
        localStorage.setItem('userId', data['userId']);
        localStorage.setItem('token', data['token']);
        console.log('successfully loged in');
        this.router.navigate[this.nextUrl];
      }
    );
  }

  formCreation() {
    this.loginForm = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required]
      }
    );
  }

}
