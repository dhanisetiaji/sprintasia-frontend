import NavMobile from './nav/mobile';
import navConfig from './nav/config-navigation';

// ----------------------------------------------------------------------

export default function Header() {
  return <NavMobile isOffset={false} data={navConfig} />;
}
