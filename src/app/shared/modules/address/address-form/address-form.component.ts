import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AddressHttpService } from '../address-http.service';
import { DivisionDto } from '../../../models/dto/division-dto.model';
import { DistrictDto } from '../../../models/dto/district-dto.model';
import { ThanaDto } from '../../../models/dto/thana-dto.model';
import { PostCodeDto } from '../../../models/dto/post-code-dto.model';
import { AppService } from '../../../../app.service';
import { ToastrService } from 'ngx-toastr';

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
  filteredDistrictListByDivisionId: DistrictDto[];
  filteredThanaListByDistrictId: ThanaDto[];
  selectedDivisionId: string;
  selectedUpazilaId: string;

  constructor(
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private addressHttpService: AddressHttpService,
    private appService: AppService, private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.appService.getDivisions().subscribe(
      divisions => this.divisions = divisions
    );

    this.appService.getDistricts().subscribe(
      districts => this.districts = districts
    );

    this.appService.getThanas().subscribe(
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

  onDivisionSelect(divisionId: string) {
    // this.filteredDistrictListByDivisionId = this.districts
    //   .filter((district: DistrictDto) => district.id.toString() === divisionId);
    // this.filteredUpazilaListByDistrictId = [];
    // this.selectedDivisionId = divisionId;
    this.appService.getDistrictsByDivisionId(divisionId).subscribe(
      districts => this.districts = districts
    );
  }

  onDistrictSelect(districtId: string) {
    // this.filteredUpazilaListByDistrictId = this.thanas
    //   .filter((upazila) => upazila.districtId.toString() === districtId);
    this.appService.getThanasByDistrictsId(districtId).subscribe(
      thanas => this.thanas = thanas
    );
  }

  onThanaSelect(thanaId: string) {
    // this.selectedUpazilaId = upazilaId;
  }

}
