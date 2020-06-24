import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from '../../../shared/models/user';
import { Subject } from 'rxjs';
import { UserDataService } from '../user-data.service';
import { ConfirmationDialogService } from '../../../shared/modules/notification/confirmation-dialog/confirmation-dialog.service';
import { ToastrService } from 'ngx-toastr';

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
    private confirmationDialogService: ConfirmationDialogService,
    private toastr: ToastrService
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
        this.toastr.error('User List Fetch Failed', 'Error');
        console.log(error);
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
          console.log(response);
          this.toastr.warning('User Deleted', 'Warning');
          this.rerender();
        },
        // tslint:disable-next-line: no-shadowed-variable
        (error) => {
          this.toastr.error('User Deletion Failed', 'Error');
        }
      );
    }
  }
}
