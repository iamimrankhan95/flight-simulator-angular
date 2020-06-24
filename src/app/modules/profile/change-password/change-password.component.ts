import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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

  constructor(
    private formbuilder: FormBuilder,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private profileHttpService: ProfileHttpService
  ) {
    // const userData = JSON.parse(localStorage.getItem('currentUser')).data;
    // comment out the line above and remove the line below when api sends json response
    const userData = localStorage.getItem('currentUser');
    this.loginId = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.createForm();
  }
  createForm() {
    this.simpleForm = this.formbuilder.group(
      {
        currentPassword: ['', Validators.required],
        newPassword: ['', [Validators.required, Validators.minLength(8)]],
        retypedNewPassword: ['', Validators.required]
      },
      { validator: confirmPasswordValidator }
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
    if (this.simpleForm.invalid) {
      return ;
    } else {
      this.profileHttpService.changePassword(this.f.currentPassword.value, this.f.newPassword.value, this.f.retypedNewPassword.value, localStorage.getItem('currentUser'))
      .subscribe( response => {
        this.toastr.success('Password Changed', 'Successful');
      }, error => {
        this.toastr.error('Password Change Failed', 'Error');
      });
    }
  }
  toggleoldFieldTextType() {
    this.oldFieldTextType = !this.oldFieldTextType;
  }
  togglenewFieldTextType() {
    this.newFieldTextType = !this.newFieldTextType;
  }
}
