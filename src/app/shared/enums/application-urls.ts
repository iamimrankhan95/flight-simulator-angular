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
    dummyData: 'assets/data.json'
  },
  auth: {
    login: environment.apiUrl + 'auth'
  },
  profile: {
    changePassword: environment.apiUrl + 'user/update-password'
  },
  division: {
    read: environment.apiUrl + 'data/division-list',
    dummyData: 'assets/divisions.json'
  },
  district: {
    get: environment.apiUrl + 'user/update-password',
    dummyData: 'assets/districts.json'
  },
  thana: {
    get: environment.apiUrl + 'user/update-password',
    dummyData: 'assets/thanas.json'
  }
}
