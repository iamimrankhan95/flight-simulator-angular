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
    name: 'Ticket',
    url: 'home/crm',
    icon: 'icon-speedometer',
    children: [
      {
        name: 'Ticket List',
        url: '/home/crm/list',
        icon: 'icon-speedometer',
      }, {
        name: 'Create Ticket',
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
