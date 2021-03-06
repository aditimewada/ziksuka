import { NbMenuItem } from '@nebular/theme';

export const TEACHERS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'nb-home',
    link: '/teacher/dashboard',
    home: true,
  },
  // {
  //   title: 'FEATURES',
  //   group: true,
  // },
  // {
  //   title: 'UI Features',
  //   icon: 'nb-keypad',
  //   link: '/pages/ui-features',
  //   children: [
  //     {
  //       title: 'Buttons',
  //       link: '/pages/ui-features/buttons',
  //     },
  //     {
  //       title: 'Grid',
  //       link: '/pages/ui-features/grid',
  //     },
  //     {
  //       title: 'Icons',
  //       link: '/pages/ui-features/icons',
  //     },
  //     {
  //       title: 'Modals',
  //       link: '/pages/ui-features/modals',
  //     },
  //     {
  //       title: 'Typography',
  //       link: '/pages/ui-features/typography',
  //     },
  //     {
  //       title: 'Animated Searches',
  //       link: '/pages/ui-features/search-fields',
  //     },
  //     {
  //       title: 'Tabs',
  //       link: '/pages/ui-features/tabs',
  //     },
  //   ],
  // },
//   {
//     title: 'Add Test',
//     icon: 'nb-compose',
//     children: [
//       // {
//       //   title: 'Form Inputs',
//       //   link: '/pages/forms/inputs',
//       // },
//       // {
//       //   title: 'Form Layouts',
//       //   link: '/pages/forms/layouts',
//       // },
//       {
//         title: 'Add Test',
//         link: '/pages/forms/test',
//       },
//     ],
//   },
  // {
  //   title: 'Components',
  //   icon: 'nb-gear',
  //   children: [
  //     {
  //       title: 'Tree',
  //       link: '/pages/components/tree',
  //     }, {
  //       title: 'Notifications',
  //       link: '/pages/components/notifications',
  //     },
  //     {
  //       title: 'Calendar',
  //       link: '/pages/components/calendar',
  //     },
  //   ],
  // },
  // {
  //   title: 'Maps',
  //   icon: 'nb-location',
  //   children: [
  //     {
  //       title: 'Google Maps',
  //       link: '/pages/maps/gmaps',
  //     },
  //     {
  //       title: 'Leaflet Maps',
  //       link: '/pages/maps/leaflet',
  //     },
  //     {
  //       title: 'Bubble Maps',
  //       link: '/pages/maps/bubble',
  //     },
  //   ],
  // },
  {
    title: 'Charts',
    icon: 'nb-bar-chart',
    children: [
      {
        title: 'charts',
        link: '/teacher/charts/echarts',
      },
      // {
      //   title: 'Charts.js',
      //   link: '/pages/charts/chartjs',
      // },
      // {
      //   title: 'D3',
      //   link: '/pages/charts/d3',
      // },
    ],
  },
   {
    title: 'ADD Questions',
    icon: 'nb-title',
    children: [
      {
        title: 'Questions',
        link: '/teacher/editors/tinymce',
      },
      // {
      //   title: 'CKEditor',
      //   link: '/pages/editors/ckeditor',
      // },
    ],
  },
  // {
  //   title: 'Tables',
  //   icon: 'nb-tables',
  //   children: [
  //     {
  //       title: 'Smart Table',
  //       link: '/pages/tables/smart-table',
  //     },
  //   ],
  // },
  // {
  //   title: 'Auth',
  //   icon: 'nb-locked',
  //   children: [
  //     {
  //       title: 'Login',
  //       link: '/pages/login',
  //     },
  //     {
  //       title: 'Register',
  //       link: '/auth/register',
  //     },
  //     {
  //       title: 'Request Password',
  //       link: '/auth/request-password',
  //     },
  //     {
  //       title: 'Reset Password',
  //       link: '/auth/reset-password',
  //     },
  //   ],
  // },
];
