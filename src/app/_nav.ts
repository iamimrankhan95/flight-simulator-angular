import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    icon: 'icon-speedometer',
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
