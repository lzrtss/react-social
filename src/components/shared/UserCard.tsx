import { Link } from 'react-router-dom';

import { Button } from '@/components/ui';

interface UserCardProps {
  imageUrl: string;
  name: string;
  username: string;
  userId: string;
}

const UserCard = ({ imageUrl, name, username, userId }: UserCardProps) => {
  const handleFollow: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();

    return;
  };

  return (
    <Link
      to={`/profile/${userId}`}
      className="p-3 sm:p-8 flex justify-between items-center gap-3 sm:gap-6 bg-dark-4 rounded-2xl"
    >
      <div className="flex justify-center items-center gap-3 sm:gap-6">
        <img
          src={imageUrl || '/assets/icons/user.svg'}
          alt={name || username}
          width={20}
          height={20}
          className="w-16 sm:w-20 lg:w-24 h-16 sm:h-20 lg:h-24 rounded-full"
        />

        <div className="flex flex-col justify-center items-center gap-1">
          <p className="text-center text-[16px] lg:text-lg font-medium text-light-1 line-clamp-1">
            {name}
          </p>
          <p className="text-center text-sm lg:text-lg text-light-3 line-clamp-1">
            @{username}
          </p>
        </div>
      </div>

      <Button
        type="button"
        size="sm"
        className="p-4 sm:px-8 sm:py-5 bg-primary-500 hover:bg-primary-500 text-light-1"
        onClick={handleFollow}
      >
        Follow
      </Button>
    </Link>
  );
};

export default UserCard;
