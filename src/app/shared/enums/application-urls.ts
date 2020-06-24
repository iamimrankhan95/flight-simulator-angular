import { environment } from '../../../environments/environment';

export const applicationUrl = {
  user: {
    create: '',
    read: '',
    update: '',
    delete: ''
  },
  crm: {
    customerRelationUrl: environment.apiUrl + 'cms_crm_record'
  },
  auth: {

  }
}
