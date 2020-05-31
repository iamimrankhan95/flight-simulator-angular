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
        name: 'create',
        url: '/crm/create',
        icon: 'icon-speedometer',
      }
    ]
  },
];
