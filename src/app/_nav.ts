import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    icon: 'icon-speedometer',
  },
  {
    title: true,
    name: 'Components'
  },
  {
    name: 'CRM',
    url: '/crm',
    icon: 'icon-speedometer',
    children: [
      {
        name: 'CRM-list',
        url: '/crm/list',
        icon: 'icon-speedometer',
      }, {
        name: 'Create CRM',
        url: '/crm/create',
        icon: 'icon-speedometer',
      }
    ]
  },
  {
    name: 'Create User',
    url: '/users/create',
    icon: 'cui-user'
  },
  {
    name: 'User List',
    url: '/users/users',
    icon: 'fa fa-address-book'
  }
];
