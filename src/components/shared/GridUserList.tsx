import { Models } from 'appwrite';

import { UserCard } from '@/components/shared';

interface GridUserListProps {
  users: Models.Document[];
}

const GridUserList = ({ users = [] }: GridUserListProps) => {
  return (
    <ul className="w-full max-w-5xl grid grid-cols-1 xs:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-7">
      {users?.map((user: Models.Document) => (
        <li key={user?.$id} className="w-full min-w-[200px] flex-1">
          <UserCard
            imageUrl={user.imageUrl}
            name={user.name}
            username={user.username}
            userId={user.$id}
          />
        </li>
      ))}
    </ul>
  );
};

export default GridUserList;
