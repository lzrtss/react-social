import { Link, useLocation } from 'react-router-dom';

import { footerLinks } from '@/constants';
import { INavLink } from '@/types';

const Footer = () => {
  const { pathname } = useLocation();

  return (
    <footer className="sticky bottom-0 w-full px-5 py-4 bg-dark-2 z-50 md:hidden">
      <ul className="flex justify-between items-center">
        {footerLinks.map((link: INavLink) => {
          const isActive = pathname === link.route;

          return (
            <li key={link.label}>
              <Link
                to={link.route}
                className={`px-3 py-2 flex flex-col justify-center items-center gap-1 transition ${
                  isActive ? 'rounded-[10px] bg-primary-500' : null
                }`}
              >
                <img
                  src={link.imgURL}
                  alt={link.label}
                  height={16}
                  width={16}
                  className={`group-hover:invert group-hover:brightness-0 transition ${
                    isActive ? 'invert brightness-0 transition' : null
                  }`}
                />
                <p className="text-xs font-medium text-light-2">{link.label}</p>
              </Link>
            </li>
          );
        })}
      </ul>
    </footer>
  );
};

export default Footer;
