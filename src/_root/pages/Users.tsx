import { useToast } from '@/components/ui/use-toast';
import { UserList, Loader } from '@/components/shared';
import { useGetUsers } from '@/lib/react-query/queries';
import { USERS } from '@/constants';

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

  if (isFetchingUsers && !users) {
    return <Loader size={48} className="mt-10 w-full flex justify-center" />;
  }

  return (
    <div className="container">
      <div className="w-full max-w-5xl flex flex-col items-start gap-6 md:gap-9">
        <div className="w-full max-w-5xl flex gap-2">
          <img
            src="/assets/icons/users.svg"
            width={36}
            height={36}
            alt="users"
            className="invert brightness-0 transition"
          />
          <h2 className="w-full text-2xl font-bold md:text-3xl text-left">
            {USERS.PAGE_TITLE}
          </h2>
        </div>

        <UserList users={users || []} />
      </div>
    </div>
  );
};

export default Users;
