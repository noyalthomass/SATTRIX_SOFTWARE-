import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private readonly router: Router,private snackBar: MatSnackBar) { }

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
          this.snackBar.open('User creation successful!', 'Close', {
            duration: 1000 
          });
        } else {
          this.snackBar.open('Passwords do not match.', 'Close', {
            duration: 1000 
          });
        }
      } else {
        this.snackBar.open('Form controls are null or undefined.', 'Close', {
          duration: 1000 
        });
      }
    }
  }
}