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
  @Input()
  crmForm: FormGroup;

  @Input()
  FormGrpName: string;

  @Input()
  crmFormSubmitted: boolean;

  isSaving = false;

  divisions: IDivision[] = [];
  districts: IDistrict[] = [];
  thanas: IThana[] = [];
  postoffices: IPostOffice[] = [];
  sizeQuery = { size: 9999 };

  editForm = this.fb.group({
    id: [],
    houseNo: [null, [Validators.required]],
    streetNo: [],
    division: [null, [Validators.required]],
    district: [null, [Validators.required]],
    thana: [null, [Validators.required]],
    postOffice: []
  });

  constructor(
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    // this.activatedRoute.data.subscribe(({ address }) => {
    //   this.updateForm(address);

    // this.divisionService.query(this.sizeQuery).subscribe((res: HttpResponse<IDivision[]>) => (this.divisions = res.body || []));

    // this.districtService.query(this.sizeQuery).subscribe((res: HttpResponse<IDistrict[]>) => (this.districts = res.body || []));

    // this.thanaService.query(this.sizeQuery).subscribe((res: HttpResponse<IThana[]>) => (this.thanas = res.body || []));

    // this.postOfficeService.query().subscribe((res: HttpResponse<IPostOffice[]>) => (this.postoffices = res.body || []));
    // });
  }

  get fPresent(): any {
    return this.crmForm.get(this.FormGrpName);
  }

  updateForm(address: IAddress): void {
    this.editForm.patchValue({
      id: address.id,
      houseNo: address.houseNo,
      streetNo: address.streetNo,
      division: address.division,
      district: address.district,
      thana: address.thana,
      postOffice: address.postOffice
    });
  }

  previousState(): void {
    window.history.back();
  }

  // save(): void {
  //   this.isSaving = true;
  //   const address = this.createFromForm();
  //   if (address.id !== undefined) {
  //     this.subscribeToSaveResponse(this.addressService.update(address));
  //   } else {
  //     this.subscribeToSaveResponse(this.addressService.create(address));
  //   }
  // }

  private createFromForm(): IAddress {
    return {
      ...new Address(),
      id: this.editForm.get(['id'])!.value,
      houseNo: this.editForm.get(['houseNo'])!.value,
      streetNo: this.editForm.get(['streetNo'])!.value,
      division: this.editForm.get(['division'])!.value,
      district: this.editForm.get(['district'])!.value,
      thana: this.editForm.get(['thana'])!.value,
      postOffice: this.editForm.get(['postOffice'])!.value
    };
  }

  // protected subscribeToSaveResponse(result: Observable<HttpResponse<IAddress>>): void {
  //   result.subscribe(
  //     () => this.onSaveSuccess(),
  //     () => this.onSaveError()
  //   );
  // }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  // trackById(index: number, item: SelectableEntity): any {
  //   return item.id;
  // }

}
