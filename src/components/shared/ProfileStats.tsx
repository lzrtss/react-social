import { Link } from 'react-router-dom';

interface ProfileStatsProps {
  profileId: string;
  posts: number;
  followers: number;
  following: number;
}

const ProfileStats = ({
  profileId,
  posts = 0,
  followers = 0,
  following = 0,
}: ProfileStatsProps) => {
  return (
    <div className="flex gap-8 mt-10 items-center justify-center xl:justify-start flex-wrap z-20">
      <Link
        to={`/profile/${profileId}`}
        className="flex justify-center items-center gap-2 xl:flex-col xl:items-start xl:gap-0 text-[16px] font-medium lg:text-lg"
      >
        <span className="text-primary-500">{posts}</span>
        <p className="text-light-2">Posts</p>
      </Link>

      <Link
        to={`/profile/${profileId}/followers`}
        className="flex justify-center items-center gap-2 xl:flex-col xl:items-start xl:gap-0 text-[16px] font-medium lg:text-lg"
      >
        <span className="text-primary-500">{followers}</span>
        <p className="text-light-2">Followers</p>
      </Link>

      <Link
        to={`/profile/${profileId}/following`}
        className="flex justify-center items-center gap-2 xl:flex-col xl:items-start xl:gap-0 text-[16px] font-medium lg:text-lg"
      >
        <span className="text-primary-500">{following}</span>
        <p className="text-light-2">Following</p>
      </Link>
    </div>
  );
};

export default ProfileStats;
