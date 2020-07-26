import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
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
    console.log('on inint');
    // reset login status
    this.authenticationService.logout();

    // get return url from route parameters or default to '/'
    // this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';
    this.route.queryParams.subscribe(
      (params: Params) => {
        this.returnUrl = params['returnUrl'] ? params['returnUrl'] : '/home';
        console.log(this.returnUrl);
      }
    );
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
        (res) => this.router.navigateByUrl(this.returnUrl),
        (error) => this.toastr.error('Please try with your correct username and password', 'Wrong credential!')
      );

    }
  }

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }
}
