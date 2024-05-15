import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  showRegisterForm = false;
  showListTable = false;

  /**
   * To show the register form in page
   */
  showRegister() {
    this.showRegisterForm = true;
    this.showListTable = false;
  }

  /**
   * to show the registered users list in page
   */
  showList() {
    this.showListTable = true;
    this.showRegisterForm = false;
  }
}
