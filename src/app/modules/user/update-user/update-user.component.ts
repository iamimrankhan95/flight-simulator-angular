import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../../shared/models/user';
import { UserDataService } from '../user-data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';
import { DateFormatter } from 'ngx-bootstrap/datepicker';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css',
  '../../../../../node_modules/ngx-bootstrap/datepicker/bs-datepicker.scss',
  '../../../../scss/vendors/ng-select/ng-select.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UpdateUserComponent implements OnInit {

  public simpleForm: FormGroup;
  public submitted = false;
  public fieldTextType: boolean;
  public phoneMask = [
    /[0]/,
    /[1-2]/,
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    /\d/,
  ];
  public phoneNumber = /^[0-9]\d{10}$/;
  public emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
  public updateUserId: number;
  public user: User;
  public maxDate: Date = new Date();
  public loginUsername: string;
  public passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

  constructor(
    private route: ActivatedRoute,
    private formbuilder: FormBuilder,
    private userDataService: UserDataService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.maxDate.setDate(this.maxDate.getDate() + 0);
  }

  ngOnInit(): void {
    this.createForm();
    this.updateUserId = +this.route.snapshot.paramMap.get('id');
    this.getUserInfo();
  }

  getUserInfo() {
    this.userDataService.getUser(this.updateUserId).subscribe(
      (response) => {
        console.log(response);
        this.user = response;
        this.setFormValues(this.user);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  createForm() {
    this.simpleForm = this.formbuilder.group({
      id: [ '' ],
      name: ['', Validators.required],
      contactNo: [
        '',
        [Validators.required, Validators.pattern(this.phoneNumber)],
      ],
      email: ['', [Validators.required, Validators.pattern(this.emailRegex)]],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(this.passwordRegex)]],
      joiningDate: [new Date(), [Validators.required]],
      active: [''],
    });
  }

  setFormValues(info: User) {
    this.f.id.setValue(this.updateUserId);
    this.f.name.setValue(info.name);
    this.f.contactNo.setValue(info.contactNo);
    this.f.email.setValue(info.email);
    this.f.joiningDate.setValue(info.joiningDate);
    this.f.username.setValue(info.username);
    this.f.password.setValue('');
    this.f.active.setValue(info.active);
  }

  get f() {
    return this.simpleForm.controls;
  }

  onReset() {
    this.submitted = false;
    this.simpleForm.reset();
  }
  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

  onSubmit() {
    this.submitted = true;
     if (!this.f.joiningDate.pristine) {
      this.f.joiningDate.setValue(
        formatDate(
          this.simpleForm.get('joiningDate').value,
          'dd/MM/yyyy',
          'en-UK'
        )
      );
     }
    if (this.simpleForm.valid) {
      console.log(this.simpleForm.value);
      this.userDataService
        .updateUser(this.simpleForm.value)
        .subscribe(
          (response) => {
            this.toastr.success('User Information Updated Successfully', 'Successful');
            const user = JSON.parse(localStorage.getItem('loggedInUser'));
            this.loginUsername = user.username;
            if (this.simpleForm.get('username').value === this.loginUsername) {
              this.router.navigate(['/auth/login']);
            } else {
              this.router.navigate(['/home/users/list']);
            }
          },
          (error) => {
            this.toastr.error('Something went wrong', 'Error');
          }
        );
    }
  }
}
