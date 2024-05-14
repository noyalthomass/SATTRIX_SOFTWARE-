import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidepanelComponent } from './components/sidepanel/sidepanel.component';
import { RegisterComponent } from './components/register/register.component';
import { ListComponent } from './components/list/list.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: RegisterComponent }, 
  { path: 'list', component: ListComponent }
];

@NgModule({
  declarations: [
    SidepanelComponent,
    RegisterComponent,
    ListComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule
  ]
})
export class DashboardModule { }
