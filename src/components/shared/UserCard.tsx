import { Link } from 'react-router-dom';

import { Button } from '@/components/ui';

interface UserCardProps {
  imageUrl: string;
  name: string;
  username: string;
  userId: string;
}

const UserCard = ({ imageUrl, name, username, userId }: UserCardProps) => {
  return (
    <Link
      to={`/profile/${userId}`}
      className="px-5 py-8 flex flex-col justify-center items-center gap-6 border border-dark-4 rounded-2xl"
    >
      <img
        src={imageUrl || '/assets/icons/user.svg'}
        alt={name || username}
        width={20}
        height={20}
        className="w-20 h-20 rounded-full"
      />

      <div className="flex flex-col justify-center items-center gap-1">
        <p className="text-center text-[16px] font-medium text-light-1 line-clamp-1">
          {name}
        </p>
        <p className="text-center text-sm text-light-3 line-clamp-1">
          @{username}
        </p>
      </div>

      <Button
        type="button"
        size="sm"
        className="px-5 flex gap-2 bg-primary-500 hover:bg-primary-500 text-light-1"
      >
        Follow
      </Button>
    </Link>
  );
};

export default UserCard;
