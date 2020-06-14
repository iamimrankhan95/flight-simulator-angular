import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from '../../../shared/models/user';
import { Subject } from 'rxjs';
import { UserDataService } from '../user-data.service';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css'],
})
export class ListUserComponent implements OnInit, OnDestroy {
  userList: User[];
  dtTrigger = new Subject();
  dtOptions: DataTables.Settings = {};

  constructor(
    private userDataService: UserDataService,
  ) {}

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
    };
    this.getUsers();
  }
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
  getUsers() {
    this.userDataService.getUsers().subscribe(
      (response) => {
        console.log(response);
        this.userList = response;
        this.dtTrigger.next();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  rerender() {
    this.userDataService.getUsers().subscribe((response) => {
      this.userList = response;
    });
  }

  delete(user: User) {
    this.userDataService.deleteUser(user).subscribe(
      (response) => {
        console.log(response);
        this.rerender();
      },
      // tslint:disable-next-line: no-shadowed-variable
      (error) => {
        console.log(error);
      }
    );
  }
}
