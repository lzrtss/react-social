import { Models } from 'appwrite';

import { UserCard } from '@/components/shared';

interface UserListProps {
  users: Models.Document[];
}

const UserList = ({ users = [] }: UserListProps) => {
  return (
    <ul className="w-full max-w-5xl flex flex-col gap-6">
      {users?.map((user: Models.Document) => (
        <li key={user?.$id} className="w-full min-w-[340px] flex-1">
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

export default UserList;
