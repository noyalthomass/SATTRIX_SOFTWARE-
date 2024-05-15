import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  editMode = false;
  userId!: number;

  constructor(private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.initForm();
    this.getEditDataAndId();

  }

/**
 * To fetch user id from url and get edit data
 */
  getEditDataAndId(): void {
    this.route.params.subscribe(params => {
      this.editMode = params['editMode'] === 'true';
      this.userId = +params['userId'];

      if (this.editMode) {
        const users = JSON.parse(sessionStorage.getItem('users') || '[]');
        const userData = users.find((user: any) => user.id === this.userId);
        if (userData) {
          this.registerForm.patchValue(userData);
        }
      }
    });
  }

/**
 * To initialize form
 */
initForm(): void {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      city: ['', Validators.required]
    });
  }

  /**
   * form control
   */
  get f() {
    return this.registerForm.controls;
  }

  /**
   * Submit the form data and stored in session storage
   */
  onSubmit(): void {
    if (this.registerForm.valid) {
      const users = JSON.parse(sessionStorage.getItem('users') || '[]');

      if (this.editMode) {
        const userIndex = users.findIndex((user: any) => user.id === this.userId);
        if (userIndex !== -1) {
          users[userIndex] = { ...users[userIndex], ...this.registerForm.value };
        }
      } else {
        const newUserId = Date.now();
        const newUser = { id: newUserId, ...this.registerForm.value };
        users.push(newUser);
      }

      sessionStorage.setItem('users', JSON.stringify(users));

      this.registerForm.reset();

      this.router.navigate(['dashboard/list']);
    }
  }
}
