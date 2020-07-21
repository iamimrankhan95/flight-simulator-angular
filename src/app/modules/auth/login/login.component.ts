import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html',
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  returnUrl: string;
  fieldTextType: boolean;

  // remove later
  data = [];

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute, private toastr: ToastrService
  ) {

  }

  ngOnInit() {
    this.authenticationService.clearUserData();
    this.createForm();
  }

  createForm() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    } else {
      this.authenticationService.login(this.loginForm.value).subscribe(
        (res) => this.router.navigate(['/home']),
        (error) => this.toastr.error('Please try with your correct username and password', 'Wrong credential!')
      );

    }
  }

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }
}
