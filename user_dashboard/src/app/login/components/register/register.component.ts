import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private readonly router: Router) { }

  ngOnInit(): void {
    this.initForm();
  }

  /**
   * To init register form with new user data
   */
  initForm(): void {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    },);
  }

  /**
   * To submit the register form,stored in session storage and redirected to dashbaord
   */
  onSubmit() {
    if (this.registerForm.valid) {
      const password = (this.registerForm.get('password') as FormControl)?.value;
      const confirmPassword = (this.registerForm.get('confirmPassword') as FormControl)?.value;

      if (password !== undefined && confirmPassword !== undefined) {
        if (password === confirmPassword) {
          const username = (this.registerForm.get('username') as FormControl)?.value;
          sessionStorage.setItem('username', username);
          sessionStorage.setItem('password', password);

          this.router.navigate(['/dashboard']);
        } else {
          console.error('Passwords do not match.');
        }
      } else {
        console.error('Form controls are null or undefined.');
      }
    }
  }
}