import { useEffect } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';

import { AppLogo } from '@/components/shared';
import { Button } from '@/components/ui';
import { useSignOut } from '@/lib/react-query/queries';
import { useUserContext } from '@/context/AuthContext';
import { MAIN_NAVBAR } from '@/constants';
import { INavLink } from '@/types';

const MainNavbar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { mutate: signOut, isSuccess } = useSignOut();
  const { user } = useUserContext();

  useEffect(() => {
    if (isSuccess) {
      navigate(0);
    }
  }, [isSuccess]);

  return (
    <nav className="hidden md:flex px-6 py-10 flex-col min-w-[270px] bg-dark-4">
      <div className="flex flex-col gap-10">
        <Link to="/">
          <AppLogo
            width={32}
            height={32}
            className="text-[24px] text-violet-100"
          />
        </Link>

        <Link to={`/profile/${user.id}`} className="flex items-center gap-3">
          <img
            src={user.imageUrl || '/assets/icons/user.svg'}
            height={56}
            width={56}
            alt="user"
            className="rounded-full"
          />

          <div className="flex flex-col items-start">
            <p className="text-lg font-bold leading-[140%]">{user.name}</p>
            <p className="text-sm font-normal text-light-3">
              {user.username ? '@' + user.username : null}
            </p>
          </div>
        </Link>

        <ul className="flex flex-col gap-6">
          {MAIN_NAVBAR.SIDEBAR_LINKS.map((link: INavLink) => {
            const isActive = pathname === link.route;

            return (
              <li
                key={link.label}
                className="group rounded-lg font-medium hover:bg-primary-500 transition"
              >
                <NavLink
                  to={link.route}
                  className={`p-4 flex gap-3 items-center ${
                    isActive ? 'rounded-lg bg-primary-500' : null
                  }`}
                >
                  <img
                    src={link.imgURL}
                    alt={link.label}
                    height={24}
                    width={24}
                    className={`group-hover:invert group-hover:brightness-0 transition ${
                      isActive ? 'invert brightness-0 transition' : null
                    }`}
                  />
                  {link.label}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>

      <Button
        variant="ghost"
        className="h-14 mt-6 p-4 flex gap-3 justify-start items-center hover:bg-transparent hover:text-white hover:bg-primary-500 transition group"
        onClick={() => signOut()}
      >
        <img
          src="/assets/icons/logout.svg"
          width={24}
          height={24}
          alt="logout"
          className="group-hover:invert group-hover:brightness-0 transition"
        />
        <p className="text-sm font-medium lg:text-[16px]">
          {MAIN_NAVBAR.LOGOUT_BUTTON_TEXT}
        </p>
      </Button>
    </nav>
  );
};

export default MainNavbar;
