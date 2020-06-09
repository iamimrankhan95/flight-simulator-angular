import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../../shared/models/user';
import { UserDataService } from '../user-data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {

  @Input() selectedUserId: number;

  public simpleForm: FormGroup;
  public submitted = false;
  public fieldTextType: boolean;
  public phoneMask = [/[0]/, /[1-2]/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/];
  public phoneNumber = /^[0-9]\d{10}$/;
  public updateUserId: number;
  public user: User;

  constructor(
    private route: ActivatedRoute,
    private formbuilder: FormBuilder,
    private userDataService: UserDataService,
    private router: Router,
    private modalService: NgbModal,
    public activeModal: NgbActiveModal
  ) {

  }

  ngOnInit(): void {
    this.createForm();
    console.log(this.selectedUserId);
    this.updateUserId = this.selectedUserId;
    this.getUserInfo();
  }

  getUserInfo() {
    this.userDataService.getUser(this.updateUserId).subscribe( response => {
      console.log(response);
      this.user = response;
      this.setFormValues(this.user);
    }, error => {
      console.log(error);
    });
  }

  createForm() {
    this.simpleForm = this.formbuilder.group({
      name : ['', Validators.required],
      contactNo: ['', [Validators.required, Validators.pattern(this.phoneNumber)]],
      email: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      joiningdate: [''],
      isActive: ['']
    });
  }

  setFormValues(info: User) {
    this.f.name.setValue(info.name);
    this.f.contactNo.setValue(info.contactNo);
    this.f.email.setValue(info.email);
    this.f.joiningdate.setValue(info.joiningdate);
    this.f.username.setValue(info.username);
    this.f.password.setValue(info.password);
    this.f.isActive.setValue(info.isActive);
  }

  get f() {
    return this.simpleForm.controls;
  }

  onReset() {
    this.submitted = false;
    this.simpleForm.reset();
    console.log(this.selectedUserId);
  }
  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

  onSubmit() {
    this.submitted = true;
    this.userDataService.updateUser(this.simpleForm.value, this.updateUserId).subscribe( response => {
      console.log('success');
      window.location.reload();
    }, error => {
      console.log('failed');
      this.onReset();
    });
    this.modalService.dismissAll();
  }

}
