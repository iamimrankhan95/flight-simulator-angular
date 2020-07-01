import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IDivision } from '../../../../shared/models/division.model';
import { IDistrict } from '../../../../shared/models/district.model';
import { IThana } from '../../../../shared/models/thana.model';
import { IPostOffice } from '../../../../shared/models/post-office.model';
import { IAddress, Address } from '../../../../shared/models/address.model';

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.css']
})
export class AddressFormComponent implements OnInit {
  @Input() parentFormGroup: FormGroup;
  @Input() FormGrpName: string;
  @Input() isFormSubmitted: boolean;
  isSaving = false;
  divisions: IDivision[] = [];
  districts: IDistrict[] = [];
  thanas: IThana[] = [];
  postoffices: IPostOffice[] = [];
  sizeQuery = { size: 9999 };

  constructor(
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
  }

  get fPresent(): any {
    return this.crmForm.get(this.FormGrpName);
  }

  previousState(): void {
    window.history.back();
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

}
