import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/home/dashboard',
    icon: 'icon-speedometer',
  },
  {
    title: true,
    name: 'Components'
  },
  {
    name: 'CRM',
    url: 'home/crm',
    icon: 'icon-speedometer',
    children: [
      {
        name: 'CRM-list',
        url: '/home/crm/list',
        icon: 'icon-speedometer',
      }, {
        name: 'Create CRM',
        url: '/home/crm/create',
        icon: 'icon-speedometer',
      }
    ]
  },
  {
    name: 'Create User',
    url: '/home/users/create',
    icon: 'cui-user'
  },
  {
    name: 'User List',
    url: '/home/users/users',
    icon: 'fa fa-address-book'
  }
];
