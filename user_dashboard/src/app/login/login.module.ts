import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './pages/login/login.component';
import { LoginAndRegisterComponent } from './components/login-and-register/login-and-register.component';
import { Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: LoginComponent } 
]

@NgModule({
  declarations: [
    LoginComponent,
    LoginAndRegisterComponent
  ],
  imports: [
    CommonModule
  ]
})
export class LoginModule { }
