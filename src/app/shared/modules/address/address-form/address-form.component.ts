import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Division } from '../../../models/division.model';
import { District } from '../../../models/district.model';
import { Thana } from '../../../models/thana.model';
import { PostOffice } from '../../../models/post-office.model';
import { AddressHttpService } from '../address-http.service';

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.css']
})
export class AddressFormComponent implements OnInit {
  @Input() parentFormGroup: FormGroup;
  @Input() addressOf: string;
  @Input() addressType: string;
  @Input() isFormSubmitted: boolean;
  isSaving = false;
  divisions: Division[] = [];
  districts: District[] = [];
  thanas: Thana[] = [];
  postoffices: PostOffice[] = [];
  sizeQuery = { size: 9999 };

  constructor(
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private addressHttpService: AddressHttpService
  ) { }

  ngOnInit(): void {
    this.addressHttpService.getDivisions().subscribe(
      divisions => this.divisions = divisions
    );

    this.addressHttpService.getDistricts().subscribe(
      districts => this.districts = districts
    );

    this.addressHttpService.getThanas().subscribe(
      thanas => this.thanas = thanas
    );
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
