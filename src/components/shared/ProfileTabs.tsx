import { PROFILE_TABS } from '@/constants';
import { Link } from 'react-router-dom';

interface ProfileTabsProps {
  pathname: string;
  userId?: string;
}

const ProfileTabs = ({ pathname, userId = '' }: ProfileTabsProps) => {
  return (
    <div className="w-full max-w-5xl flex">
      <Link
        to={`/profile/${userId}`}
        className={`w-48 py-4 flex flex-1 justify-center items-center gap-3 xl:flex-initial bg-dark-3 transition rounded-l-lg border border-dark-4 ${
          pathname === `/profile/${userId}` ? 'bg-dark-4 ' : ''
        }`}
      >
        <img
          src={'/assets/icons/post.svg'}
          alt="posts"
          width={20}
          height={20}
        />
        {PROFILE_TABS.POSTS_TAB_LABEL}
      </Link>
      <Link
        to={`/profile/${userId}/liked-posts`}
        className={`w-48 py-4 flex flex-1 justify-center items-center gap-3 xl:flex-initial bg-dark-3 transition rounded-r-lg border-y border-r border-dark-4 ${
          pathname === `/profile/${userId}/liked-posts` ? 'bg-dark-4' : ''
        }`}
      >
        <img
          src={'/assets/icons/like.svg'}
          alt="likes"
          width={20}
          height={20}
        />
        {PROFILE_TABS.LIKES_TAB_LABEL}
      </Link>
    </div>
  );
};

export default ProfileTabs;
