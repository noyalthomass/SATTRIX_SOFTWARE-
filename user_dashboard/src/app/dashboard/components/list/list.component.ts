import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'email', 'phone', 'city', 'actions'];
  dataSource: any[] = [];

  constructor(private readonly router: Router
  ) { }

  ngOnInit(): void {
    const users = JSON.parse(sessionStorage.getItem('users') || '[]');
    this.dataSource = users;
  }

  /**
   * 
   * @param id number
   */
  editUser(id: number) {
    this.router.navigate(['dashboard/register', { userId: id, editMode: true }]);
  }

/**
 * 
 * @param user number
 */
  deleteUser(id: number) {
    const users = JSON.parse(sessionStorage.getItem('users') || '[]');

    const index = users.findIndex((u: any) => u.id === id);

    if (index !== -1) {
      users.splice(index, 1);

      sessionStorage.setItem('users', JSON.stringify(users));

      this.dataSource = users;
    }
  }

}
