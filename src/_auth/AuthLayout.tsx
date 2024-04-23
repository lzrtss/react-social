import { Navigate, Outlet } from 'react-router-dom';

import { useUserContext } from '@/context/AuthContext';

const AuthLayout = () => {
  const { isAuthenticated } = useUserContext();

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <section className="py-10 flex flex-1 flex-col justify-center items-center">
        <Outlet />
      </section>
    </>
  );
};

export default AuthLayout;
