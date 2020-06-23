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

export const confirmPasswordValidator: ValidatorFn = (
  control: FormGroup
): ValidationErrors | null => {
  const password = control.get('new_password');
  const confirm = control.get('re_password');
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
    private toastr: ToastrService
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
        old_password: ['', Validators.required],
        new_password: ['', [Validators.required, Validators.minLength(6)]],
        re_password: ['', Validators.required],
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
      return;
    } else {
      this.toastr.success('Password Changed', 'Successful');
      // Put the call to the service here
    }
  }
  toggleoldFieldTextType() {
    this.oldFieldTextType = !this.oldFieldTextType;
  }
  togglenewFieldTextType() {
    this.newFieldTextType = !this.newFieldTextType;
  }
}
