import { Routes, Route } from 'react-router-dom';

import { Toaster } from '@/components/ui';
import { SignIn, SignUp } from './_auth/pages';
import {
  CreatePost,
  EditPost,
  EditProfile,
  Explore,
  Home,
  PostDetails,
  Profile,
  Saved,
  Users,
} from './_root/pages';
import AuthLayout from './_auth/AuthLayout';
import RootLayout from './_root/RootLayout';

const App = () => {
  return (
    <main className="min-h-screen flex">
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
        </Route>

        <Route element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/saved" element={<Saved />} />
          <Route path="/users" element={<Users />} />

          <Route path="/edit-post/:id" element={<EditPost />} />
          <Route path="/posts/:id" element={<PostDetails />} />
          <Route path="/profile/:id/*" element={<Profile />} />
          <Route path="/edit-profile/:id" element={<EditProfile />} />
        </Route>
      </Routes>

      <Toaster />
    </main>
  );
};

export default App;
