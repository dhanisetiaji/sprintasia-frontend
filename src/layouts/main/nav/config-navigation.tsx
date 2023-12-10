// routes
import { PATH_PAGE } from '../../../routes/paths';
// components
import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------

const navConfig = [
  {
    title: 'OnGoing Task List',
    icon: <Iconify icon="eva:home-fill" />,
    path: '/',
  },
  {
    title: 'Completed Task List',
    icon: <Iconify icon="eva:checkmark-circle-2-fill" />,
    path: '/done',
  },
];

export default navConfig;
