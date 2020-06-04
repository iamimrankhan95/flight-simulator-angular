import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../authentication.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted = false;
  returnUrl: string;
  fieldTextType: boolean;

  // remove later
  data = [];

  constructor( private formBuilder: FormBuilder,
               private authenticationService: AuthenticationService,
               private router: Router,
               private route: ActivatedRoute ) {
    // if (this.authenticationService.currentUserValue) {
    //   this.router.navigate(['/']);
    // }
  }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    // this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return ;
    } else {
      // remove the line below
      // this.authenticationService.login(this.f.username.value, this.f.password.value).subscribe( response => {
      //   console.log(response);
      // });
      // localStorage.setItem('currentUser', this.loginForm.get('username').value);

      this.authenticationService.login(this.f.username.value, this.f.password.value);
      // console.log(localStorage.getItem('currentUser'));
      this.router.navigate(['/']);
    }

  }

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }
 }
