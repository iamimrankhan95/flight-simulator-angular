import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AddressHttpService } from '../address-http.service';
import { DivisionDto } from '../../../models/dto/division-dto.model';
import { DistrictDto } from '../../../models/dto/district-dto.model';
import { ThanaDto } from '../../../models/dto/thana-dto.model';
import { PostCodeDto } from '../../../models/dto/post-code-dto.model';
import { AppService } from '../../../../app.service';

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
  divisions: DivisionDto[] = [];
  districts: DistrictDto[] = [];
  thanas: ThanaDto[] = [];
  postoffices: PostCodeDto[] = [];
  sizeQuery = { size: 9999 };

  constructor(
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private addressHttpService: AddressHttpService,
    private appService: AppService
  ) { }

  ngOnInit(): void {
    this.appService.getDivisions().subscribe(
      divisions => this.divisions = divisions,
      (error) => {

      }
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
