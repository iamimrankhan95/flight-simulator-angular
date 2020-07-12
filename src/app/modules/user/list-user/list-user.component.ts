import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from '../../../shared/models/user';
import { Subject } from 'rxjs';
import { UserDataService } from '../user-data.service';
import { ConfirmationDialogService } from '../../../shared/modules/notification/confirmation-dialog/confirmation-dialog.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css'],
})
export class ListUserComponent implements OnInit, OnDestroy {
  userList: User[];
  dtTrigger = new Subject();
  dtOptions: DataTables.Settings = {};
  loginUsername: string;

  constructor(
    private userDataService: UserDataService,
    private confirmationDialogService: ConfirmationDialogService,
    private toastr: ToastrService,
    private router: Router
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
      }
    );
  }

  rerender() {
    this.userDataService.getUsers().subscribe((response) => {
      this.userList = response;
    });
  }

  async delete(user: User) {
    const confirm = await this.confirmationDialogService.confirm(
      'Confirm Delete Request',
      'Please confirm Deletion of User: ' + user.name + ' !',
      'Confirm',
      'Cancel',
      'md'
    );
    if (confirm) {
      this.userDataService.deleteUser(user).subscribe(
        (response) => {
          this.toastr.warning('User Deleted', 'Warning');
          console.log(response);
          const tempuser = JSON.parse(localStorage.getItem('loggedInUser'));
          this.loginUsername = tempuser.username;
          if (user.username === this.loginUsername) {
            this.router.navigate(['/auth/login']);
          } else {
            this.rerender();
          }

        },
        // tslint:disable-next-line: no-shadowed-variable
        (error) => {
          this.toastr.error('Something went wrong', 'Error');
        }
      );
    }
  }
}
