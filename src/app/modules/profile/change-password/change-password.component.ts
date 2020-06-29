import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ValidatorFn,
  ValidationErrors,
  FormControl,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProfileHttpService } from '../profile-http.service';

export const confirmPasswordValidator: ValidatorFn = (
  control: FormGroup
): ValidationErrors | null => {
  const password = control.get('newPassword');
  const confirm = control.get('retypedNewPassword');
  return password && confirm && password.value === confirm.value
    ? null
    : { passwordMismatch: true };
};

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
})
export class ChangePasswordComponent implements OnInit {
  public simpleForm: FormGroup;
  public submitted = false;
  public loginId: any; // change to number later
  oldFieldTextType: boolean;
  newFieldTextType: boolean;
  retypedNewFieldTextType: boolean;
  public loginUsername;
  public passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

  constructor(
    private formbuilder: FormBuilder,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private profileHttpService: ProfileHttpService,
    private router: Router
  ) {
    // const userData = JSON.parse(localStorage.getItem('currentUser')).data;
    // comment out the line above and remove the line below when api sends json response
    const user = JSON.parse(localStorage.getItem('loggedInUser'));
    this.loginUsername = user.username;
  }

  ngOnInit(): void {
    this.createForm();
  }
  createForm() {
    this.simpleForm = this.formbuilder.group(
      {
        currentPassword: ['', Validators.required],
        newPassword: ['', Validators.compose([Validators.required, Validators.minLength(8), Validators.pattern(this.passwordRegex)])],
        retypedNewPassword: ['', [Validators.required]]
      },
      {validator: confirmPasswordValidator}
    );
  }
  onReset() {
    this.submitted = false;
    this.simpleForm.reset();
  }
  get f() {
    return this.simpleForm.controls;
  }
  onSubmit() {
    this.submitted = true;
     if(this.simpleForm.valid) {
      this.profileHttpService.changePassword(this.f.currentPassword.value, this.f.newPassword.value, this.f.retypedNewPassword.value, this.loginUsername)
      .subscribe( response => {
        this.toastr.success('Password Changed Successfully', 'Successful');
        this.router.navigate(['/auth/login']);
      }, error => {
        this.submitted = false;
        this.toastr.error('Something went wrong', 'Error');
      });
    }
  }
  toggleoldFieldTextType() {
    this.oldFieldTextType = !this.oldFieldTextType;
  }
  togglenewFieldTextType() {
    this.newFieldTextType = !this.newFieldTextType;
  }
  toggleretypedNewFieldTextType() {
    this.retypedNewFieldTextType = !this.retypedNewFieldTextType;
  }
}
