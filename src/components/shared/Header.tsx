import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { AppLogo } from '@/components/shared';
import { Button } from '@/components/ui';
import { useSignOut } from '@/lib/react-query/queries';
import { useUserContext } from '@/context/AuthContext';

const Header = () => {
  const navigate = useNavigate();
  const { mutate: signOut, isSuccess } = useSignOut();
  const { user } = useUserContext();

  useEffect(() => {
    if (isSuccess) {
      navigate(0);
    }
  }, [isSuccess]);

  return (
    <header className="w-full sticky top-0 z-50 md:hidden bg-dark-4">
      <div className="px-5 py-4 flex justify-between items-center">
        <Link to="/">
          <AppLogo width={32} height={32} className="text-violet-100" />
        </Link>

        <div className="flex justify-center items-center gap-2">
          <Button
            variant="ghost"
            className="p-2 flex gap-2 justify-start items-center hover:bg-transparent hover:text-white"
            onClick={() => signOut()}
          >
            <img
              src="/assets/icons/logout.svg"
              width={24}
              height={24}
              alt="logout"
            />
          </Button>

          <Link
            to={`/profile/${user.id}`}
            className="p-2 flex justify-center items-center gap-2"
          >
            <img
              src={user.imageUrl || '/assets/icons/user.svg'}
              height={32}
              width={32}
              alt="user"
              className="rounded-full"
            />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
