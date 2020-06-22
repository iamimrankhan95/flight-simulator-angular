export class Institution {
  instituteContactNumber: string;
  instituteEIINNo: string;
  instituteName: string;
  instituteType: string;
  upazilaId: number;
  districtId: number;

  constructor(
    instituteContactNumber: string,
    instituteEIINNo: string,
    instituteName: string,
    instituteType: string,
    upazilaId: number,
    districtId: number,
  ) {
    this.instituteContactNumber = instituteContactNumber;
    this.instituteEIINNo = instituteEIINNo;
    this.instituteName = instituteName;
    this.instituteType = instituteType;
    this.upazilaId = upazilaId;
    this.districtId = districtId;
  }

  static adaptForPost(institutionInfo: any): Institution {
    return new Institution(
      institutionInfo.instituteContactNumber,
      institutionInfo.instituteEIINNo,
      institutionInfo.institutionName,
      institutionInfo.instituteType,
      institutionInfo.upazila,
      institutionInfo.district
    );
  }
}
