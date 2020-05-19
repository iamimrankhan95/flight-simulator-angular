import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  public simpleForm: FormGroup;
  public submitted = false;
  public loginId: any; // change to number later

  constructor(
    private formbuilder: FormBuilder,
    private route: ActivatedRoute
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
    this.simpleForm = this.formbuilder.group({
    old_password: [''],
    new_password: ['', [Validators.required, Validators.minLength(6)]],
    re_password: ['', [Validators.required]]
    });
  }
  onReset(){
    this.submitted = false;
    this.simpleForm.reset();
  }
  get f() {
    return this.simpleForm.controls;
  }
  onSubmit(){
    this.submitted = true;
    if (this.simpleForm.invalid){
      return ;
    } else {
      // Put the call to the service here
    }
  }

}
