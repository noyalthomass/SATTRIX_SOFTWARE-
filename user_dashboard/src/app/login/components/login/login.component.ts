import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  submitted = false;
  invalidCredentials = false;

  constructor(private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.initForm();
  }

  /**
   * To init the login form
   */
  initForm() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }


  /**
   * login form control
   */
  get form() { return this.loginForm.controls; }

  /**
   * To submit the login data and redirected to dashboard
   */
  onSubmit() {
    this.submitted = true;
    this.invalidCredentials = false;

    if (this.loginForm.valid) {
      const username = this.loginForm.value.username;
      const password = this.loginForm.value.password;

      const storedUsername = sessionStorage.getItem('username');
      const storedPassword = sessionStorage.getItem('password');

      if (username === storedUsername && password === storedPassword) {
        this.router.navigate(['/dashboard']);
      } else {

        this.invalidCredentials = true;
      }
    }
  }
}
