import { Outlet } from 'react-router-dom';

import { Footer, Header, MainNavbar } from '@/components/shared';

const RootLayout = () => {
  return (
    <div className="w-full md:flex">
      <Header />
      <MainNavbar />

      <section className="h-full flex flex-1">
        <Outlet />
      </section>

      <Footer />
    </div>
  );
};

export default RootLayout;
