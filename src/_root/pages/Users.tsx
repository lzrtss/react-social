import { useToast } from '@/components/ui/use-toast';
import { UserList, Loader } from '@/components/shared';
import { useGetUsers } from '@/lib/react-query/queries';

const Users = () => {
  const { toast } = useToast();

  const {
    data: users,
    isLoading: isFetchingUsers,
    isError: isErrorCreators,
  } = useGetUsers();

  if (isErrorCreators) {
    toast({ title: 'Failed to fetch users. Please try again later.' });

    return;
  }

  return (
    <div className="container">
      <div className="w-full max-w-5xl flex flex-col items-start gap-6 md:gap-9">
        <h2 className="w-full text-left text-xl md:text-2xl font-bold">
          Users
        </h2>
        {isFetchingUsers && !users ? (
          <Loader size={48} className="mt-10 w-full flex justify-center" />
        ) : (
          <UserList users={users?.documents || []} />
        )}
      </div>
    </div>
  );
};

export default Users;
