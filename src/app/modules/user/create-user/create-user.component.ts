import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserDataService } from '../user-data.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  public simpleForm: FormGroup;
  public submitted = false;
  public fieldTextType: boolean;
  public phoneMask = [/[0]/, /[1-2]/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/];
  public phoneNumber = /^[0-9]\d{10}$/;

  constructor(
    private formbuilder: FormBuilder,
    private userDataService: UserDataService
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.simpleForm = this.formbuilder.group({
      name : ['', Validators.required],
      contactNo: ['', [Validators.required, Validators.pattern(this.phoneNumber)]],
      email: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      joiningDate: ['', Validators.required],
      isActive: ['']
    });
  }
  onSubmit() {
    this.submitted = true;
    console.log(this.simpleForm.value);
    if(this.simpleForm.valid) {
      this.userDataService.register(this.simpleForm.value).subscribe( response => {
        console.log(response);
      },
      error => {
        console.log(error);
      });
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
