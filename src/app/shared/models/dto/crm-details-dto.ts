export class CrmDetailsDto {
  'accusedOrganizationAddress': {
    'address': string,
    'id': number,
    'postCode': string,
    'thana': {
      'bnThana': string,
      'districtId': number,
      'id': number,
      'thana': string
    },
    'thanaId': number
  };
  'accusedOrganizationAddressId': number;
  'accusedOrganizationName': string;
  'agentid': number;
  'applicationType': {
    'id': number,
    'name': string
  };
  'applicationTypeId': number;
  'company': {
    'address': string,
    'contactNo': string,
    'id': number,
    'name': string
  };
  'companyId': number;
  'complainDate': string;
  'complaintName': string;
  'contactNo': string;
  'department': {
    'id': number,
    'name': string
  };
  'departmentId': number;
  'dob': string;
  'email': string;
  'fatherOrHusbandName': string;
  'genderId': number;
  'id': number;
  'isHusband': number;
  'motherName': string;
  'msisdn': string;
  'nidNumber': string;
  'occupation': string;
  'permanentAddress': {
    'address': string,
    'id': number,
    'postCode': string,
    'thana': {
      'bnThana': string,
      'districtId': number,
      'id': number,
      'thana': string
    },
    'thanaId': number
  };
  'permanentAddressId': number;
  'presentAddress': {
    'address': string,
    'id': number,
    'postCode': string,
    'thana': {
      'bnThana': string,
      'districtId': number,
      'id': number,
      'thana': string
    },
    'thanaId': number
  };
  'presentAddressId': number;
  'problemDescription': string;
  'ticketStatus': {
    'description': string,
    'id': number,
    'name': string,
    'priority': number
  };
  'ticketStatusId': number;
  'uniqueId': number;
  'user': {
    'active': true,
    'contactNo': string,
    'email': string,
    'id': number,
    'joiningDate': string,
    'name': string,
    'password': string,
    'username': string
  };
  'userId': number;
}
