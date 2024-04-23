import { Models } from 'appwrite';

import { UserCard } from '@/components/shared';
import { useGetCurrentUser } from '@/lib/react-query/queries';

interface UserListProps {
  users: Models.Document[];
}

const UserList = ({ users }: UserListProps) => {
  const { data: user } = useGetCurrentUser();

  if (!user) {
    return;
  }

  return (
    <ul className="w-full max-w-5xl flex flex-col gap-6">
      {users.map((user: Models.Document) => {
        return (
          <li key={user?.$id} className="w-full min-w-[340px] flex-1">
            <UserCard user={user} />
          </li>
        );
      })}
    </ul>
  );
};

export default UserList;
