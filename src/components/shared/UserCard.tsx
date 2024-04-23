import { Link } from 'react-router-dom';
import { Models } from 'appwrite';

interface UserCardProps {
  user: Models.Document;
}

const UserCard = ({ user }: UserCardProps) => {
  const { $id: userId, imageUrl, name, username } = user;

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
    </Link>
  );
};

export default UserCard;
