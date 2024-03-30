import { Routes, Route } from 'react-router-dom';

import { Toaster } from '@/components/ui';
import { SignIn, SignUp } from './_auth/pages';
import { AllUsers, CreatePost, Explore, Home, Saved } from './_root/pages';
import AuthLayout from './_auth/AuthLayout';
import RootLayout from './_root/RootLayout';

const App = () => {
  return (
    <main className="h-screen flex">
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
        </Route>

        <Route element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="/all-users" element={<AllUsers />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/saved" element={<Saved />} />
        </Route>
      </Routes>

      <Toaster />
    </main>
  );
};

export default App;
