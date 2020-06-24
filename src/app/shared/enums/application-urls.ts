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
    customerRelationUrl: environment.apiUrl + 'cms_crm_record'
  },
  auth: {
    login: environment.apiUrl + 'auth'
  },
  profile: {
    changePassword: environment.apiUrl + 'user/update-password'
  }
}
