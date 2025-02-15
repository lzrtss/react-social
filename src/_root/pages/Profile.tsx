import {
  Route,
  Routes,
  Outlet,
  useParams,
  useLocation,
} from 'react-router-dom';

import {
  PostList,
  LikedPosts,
  Loader,
  ProfileInfo,
  ProfileTabs,
} from '@/components/shared';
import { useUserContext } from '@/context/AuthContext';
import { useGetUserById } from '@/lib/react-query/queries';

const Profile = () => {
  const { id } = useParams();
  const { pathname } = useLocation();
  const { user: currentUser } = useUserContext();

  const { data: userProfile, isPending: isFetchingUserProfile } =
    useGetUserById(id || '');

  if (!userProfile || isFetchingUserProfile || !currentUser.id) {
    return (
      <Loader
        size={48}
        className="flex justify-center items-center w-full h-full"
      />
    );
  }

  const isMyProfile = userProfile.$id === currentUser.id;

  return (
    <div className="py-10 px-5 md:p-14 flex flex-1 flex-col items-center gap-10 overflow-scroll custom-scrollbar">
      <ProfileInfo userProfile={userProfile} isMyProfile={isMyProfile} />

      {<ProfileTabs pathname={pathname} userId={id} />}

      <Routes>
        <Route
          index
          element={<PostList posts={userProfile.posts} showUser={false} />}
        />

        <Route path="/liked-posts" element={<LikedPosts />} />
      </Routes>
      <Outlet />
    </div>
  );
};

export default Profile;
