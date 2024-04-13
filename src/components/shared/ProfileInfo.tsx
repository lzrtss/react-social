import { Link } from 'react-router-dom';
import { Models } from 'appwrite';

import { ProfileStats } from '@/components/shared';
import { Button } from '@/components/ui';

interface ProfileInfoProps {
  userProfile: Models.Document;
  isMyProfile: boolean;
}

const ProfileInfo = ({ userProfile, isMyProfile }: ProfileInfoProps) => {
  return (
    <section className="relative w-full max-w-5xl">
      <div className="flex flex-1 flex-col xl:flex-row max-xl:items-center justify-between gap-7">
        <div className="flex flex-col justify-between gap-7">
          <img
            src={
              userProfile.imageUrl || '/assets/icons/profile-placeholder.svg'
            }
            alt="profile photo"
            width={36}
            height={36}
            className="w-28 h-28 lg:h-36 lg:w-36 rounded-full"
          />

          <div className="w-full flex flex-col">
            <h2 className="w-full text-center xl:text-left text-xl md:text-2xl font-bold md:h1-semibold">
              {userProfile.name}
            </h2>

            <p className="text-sm md:text-[16px] font-medium text-light-3 text-center xl:text-left">
              @{userProfile.username}
            </p>
          </div>
        </div>

        <ProfileStats
          profileId={userProfile.$id}
          posts={userProfile.posts.length}
          followers={15}
          following={10}
        />

        <div className="w-full flex justify-center gap-4">
          {isMyProfile ? (
            <Link
              to={`/edit-profile/${userProfile.$id}`}
              className={`w-full h-12 px-5 flex justify-center items-center gap-2 bg-dark-4 text-light-1 rounded-lg`}
            >
              <img
                src={'/assets/icons/edit.svg'}
                alt="edit"
                width={20}
                height={20}
              />
              <p className="flex whitespace-nowrap text-sm font-medium">
                Edit Profile
              </p>
            </Link>
          ) : (
            <Button
              type="button"
              className="w-full px-8 flex bg-primary-500 hover:bg-primary-500 text-light-1 whitespace-nowrap"
            >
              Follow
            </Button>
          )}
        </div>
      </div>

      <p className="mt-7 test-sm font-medium md:text-[16px] text-left">
        {userProfile.bio}
      </p>
    </section>
  );
};
// const ProfileInfo = ({ userProfile, isMyProfile }: ProfileInfoProps) => {
//   return (
//     <section className="relative w-full max-w-5xl md:mb-8">
//       <div className="flex xl:flex-row flex-col max-xl:items-center flex-1 gap-7">
//         <img
//           src={userProfile.imageUrl || '/assets/icons/profile-placeholder.svg'}
//           alt="profile photo"
//           width={36}
//           height={36}
//           className="w-28 h-28 lg:h-36 lg:w-36 rounded-full"
//         />

//         <div className="flex flex-col flex-1 justify-between gap-7">
//           <div className="w-full flex flex-col">
//             <h2 className="w-full text-center xl:text-left text-xl md:text-2xl font-bold md:h1-semibold">
//               {userProfile.name}
//             </h2>

//             <p className="text-sm md:text-[16px] font-medium text-light-3 text-center xl:text-left">
//               @{userProfile.username}
//             </p>
//           </div>

//           <ProfileStats
//             profileId={userProfile.$id}
//             posts={userProfile.posts.length}
//             followers={15}
//             following={10}
//           />
//         </div>

//         <div className="flex justify-center gap-4">
//           {isMyProfile ? (
//             <Link
//               to={`/edit-profile/${userProfile.$id}`}
//               className={`h-12 px-5 flex justify-center items-center gap-2 bg-dark-4 text-light-1 rounded-lg`}
//             >
//               <img
//                 src={'/assets/icons/edit.svg'}
//                 alt="edit"
//                 width={20}
//                 height={20}
//               />
//               <p className="flex whitespace-nowrap text-sm font-medium">
//                 Edit Profile
//               </p>
//             </Link>
//           ) : (
//             <Button
//               type="button"
//               className="px-8 flex bg-primary-500 hover:bg-primary-500 text-light-1 whitespace-nowrap"
//             >
//               Follow
//             </Button>
//           )}
//         </div>
//       </div>

//       <p className="mt-10 test-sm font-medium md:text-[16px] text-center xl:text-left">
//         {userProfile.bio}
//       </p>
//     </section>
//   );
// };

export default ProfileInfo;
