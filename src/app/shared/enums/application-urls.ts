import { environment } from '../../../environments/environment';

export const applicationUrl = {
  user: {
    create: environment.apiUrl + 'user/create',
    readAll: environment.apiUrl + 'user/all',
    readByID: environment.apiUrl + 'user/find',
    update: environment.apiUrl + 'user/update',
    delete: environment.apiUrl + 'user/delete'
  },
  crm: {
    create: environment.apiUrl + 'crm/create/',
    read: environment.apiUrl + 'crm/all/',
    update: environment.apiUrl + 'crm/update/',
    delete: environment.apiUrl + 'crm/delete/',
    find: environment.apiUrl + 'crm/find/',
    dummyData: 'assets/data.json',
    ticketStatusUpdate: environment.apiUrl + 'crm/ticket-status-update',
    findCrmByParam: environment.apiUrl + 'crm/find-crm-by-param',
  },
  auth: {
    login: environment.apiUrl + 'auth'
  },
  profile: {
    changePassword: environment.apiUrl + 'user/update-password'
  },
  division: {
    read: environment.apiUrl + 'data/division-list',
    readById: environment.apiUrl + 'data/division-list',
    dummyData: 'assets/divisions.json'
  },
  district: {
    read: environment.apiUrl + 'data/district-list',
    readByDivisionId: environment.apiUrl + 'data/division-wise-district-list/',
    dummyData: 'assets/districts.json'
  },
  thana: {
    read: environment.apiUrl + 'data/thana-list',
    readByDistrictId: environment.apiUrl + 'data/district-wise-thana-list/',
    dummyData: 'assets/thanas.json'
  },
  ticket: {
    status: {
      read: environment.apiUrl + 'data/ticket-status-list',
    }
  },
  company: {
    read: environment.apiUrl + 'data/company-list',
  },
  department: {
    read: environment.apiUrl + 'data/department-list',
  },
  flightSimulator: {
    read: 'http://nmflightapi.azurewebsites.net/api/flight',
  }
};
