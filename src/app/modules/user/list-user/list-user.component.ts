import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from '../../../shared/models/user';
import { Subject } from 'rxjs';
import { UserDataService } from '../user-data.service';
import { error } from 'protractor';
import { Router } from '@angular/router';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css'],
})
export class ListUserComponent implements OnInit, OnDestroy {
  userList: User[];
  dtTrigger = new Subject();
  dtOptions: DataTables.Settings = {};
  // public selectedUserId: number;

  constructor(
    private userDataService: UserDataService,
    private router: Router,
    // private modalService: NgbModal,
    // public activeModal: NgbActiveModal
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
    this.userDataService.getUsers().subscribe(
      (response) => {
        this.userList = response;
      });
  }

  delete(user: User) {
    this.userDataService.deleteUser(user).subscribe(
      (response) => {
        console.log(response);
        this.rerender();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  // update(item, content) {
  //   if (this.modalService.hasOpenModals()) {
  //     this.modalService.dismissAll();
  //   }
  //   console.log(item.id);

  //   this.selectedUserId = item.id;
  //   const modalRef = this.modalService.open(content, {
  //     size: 'lg',
  //     backdrop: 'static',
  //   });
  // }

}
