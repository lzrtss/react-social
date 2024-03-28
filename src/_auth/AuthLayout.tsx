import { Navigate, Outlet } from 'react-router-dom';

const AuthLayout = () => {
  const isAuthenticated = false;

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
