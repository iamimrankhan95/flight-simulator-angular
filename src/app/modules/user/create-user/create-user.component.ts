import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserDataService } from '../user-data.service';
import { formatDate } from '@angular/common';
import { OtpService } from '../../../shared/modules/otp/otp.service';
import { Subscription } from 'rxjs';
import { ConfirmationDialogService } from '../../../shared/modules/notification/confirmation-dialog/confirmation-dialog.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { User } from '../../../shared/models/user';
import { AppService } from '../../../app.service';
import { CompanyDto } from '../../../shared/models/dto/company-dto';
import { DepartmentDto } from '../../../shared/models/dto/department-dto';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: [
    './create-user.component.css',
    '../../../../../node_modules/ngx-bootstrap/datepicker/bs-datepicker.scss',
    '../../../../scss/vendors/ng-select/ng-select.scss',
  ],
  encapsulation: ViewEncapsulation.None,
})
export class CreateUserComponent implements OnInit, OnDestroy {
  public simpleForm: FormGroup;
  public submitted = false;
  public message: boolean = false;
  public fieldTextType: boolean;
  public submissionError = true;
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
  public maxDate: Date = new Date();
  public userContactNo: number;
  otpVerificationSubscription: Subscription;
  public passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
  updateUserId: number;
  isEditMode: boolean = false;
  user: User;
  loginUsername: any;
  companies: CompanyDto[];
  departments: DepartmentDto[];

  constructor(
    private formbuilder: FormBuilder,
    private userDataService: UserDataService,
    private otpService: OtpService,
    private appService: AppService,
    private confirmationDialogService: ConfirmationDialogService,
    private toastr: ToastrService,
    private route: ActivatedRoute, private router: Router,
  ) {
    this.maxDate.setDate(this.maxDate.getDate() + 0);
  }

  ngOnDestroy(): void {
    // this.otpVerificationSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.createForm();
    this.appService.getCompanies().subscribe(
      (companies: CompanyDto[]) => {
        this.companies = companies;
        this.appService.getDepartments().subscribe(
          (departments: DepartmentDto[]) => this.departments = departments
        );
      }
    );

    this.route.params.subscribe(
      (params: Params) => {
        this.updateUserId = params['id'] ? +params['id'] : null;
        this.isEditMode = params['id'] != null;
        if (this.isEditMode) {
          this.getUserInfo();
        }
      }
    );
  }

  createForm() {
    this.simpleForm = this.formbuilder.group({
      id: [''],
      name: ['', [Validators.required]],
      contactNo: [
        '',
        [Validators.required, Validators.pattern(this.phoneNumber)],
      ],
      email: ['', [Validators.required, Validators.pattern(this.emailRegex)]],
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(this.passwordRegex)]],
      joiningDate: [this.maxDate, [Validators.required]],
      companyId: ['', [Validators.required]],
      departmentId: [''],
      active: [''],
    });
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

  setFormValues(info: User) {
    this.f.id.setValue(this.updateUserId);
    this.f.name.setValue(info.name);
    this.f.contactNo.setValue(info.contactNo);
    this.f.email.setValue(info.email);
    this.f.joiningDate.setValue(info.joiningDate);
    this.f.username.setValue(info.username);
    this.f.password.setValue('');
    this.f.companyId.setValue(info.companyId);
    this.f.departmentId.setValue(info.departmentId);
    this.f.active.setValue(info.active);
  }

  async onSubmit() {
    this.submitted = true;
    if (this.simpleForm.valid) {

      if (this.isEditMode) {
        const confirm = await this.confirmationDialogService.confirm(
          'Confirmation',
          'Are you sure you want to Update this User?',
          'Yes',
          'No',
          'md'
        );
        if (confirm) {
          this.f.joiningDate.setValue(
            formatDate(
              this.simpleForm.get('joiningDate').value,
              'dd/MM/yyyy',
              'en-UK'
            )
          );

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
      } else {

        const confirm = await this.confirmationDialogService.confirm(
          'Confirmation',
          'Are you sure you want to CREATE a New User?',
          'Yes',
          'No',
          'md'
        );
        if (confirm) {
          this.f.joiningDate.setValue(
            formatDate(
              this.simpleForm.get('joiningDate').value,
              'dd/MM/yyyy',
              'en-UK'
            )
          );
          this.otpService.openOtpModal();
          this.otpVerificationSubscription = this.otpService
            .onOtpVerification()
            .subscribe((isVerified) => {
              if (isVerified) {
                console.log('verified');
                this.userDataService.register(this.simpleForm.value).subscribe(
                  (response) => {
                    console.log(response);
                    this.toastr.success('User created successfully', 'Successful');
                    this.onReset();
                  },
                  (error) => {
                    console.log(error);
                    this.toastr.error('Something went wrong', 'Error');
                    this.submitted = false;
                  }
                );
              } else {
                console.log('not verified');
              }
              this.otpVerificationSubscription.unsubscribe();
            });
        }

      }
      console.log('modal not touched');
    }
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
}
