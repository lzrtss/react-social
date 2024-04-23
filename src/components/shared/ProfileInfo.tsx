import { Link } from 'react-router-dom';
import { Models } from 'appwrite';

import { PROFILE_INFO } from '@/constants';

interface ProfileInfoProps {
  userProfile: Models.Document;

  isMyProfile: boolean;
}

const ProfileInfo = ({
  userProfile,

  isMyProfile,
}: ProfileInfoProps) => {
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

        <div className="max-lg:w-full flex justify-center gap-4">
          {isMyProfile ? (
            <Link
              to={`/edit-profile/${userProfile.$id}`}
              className={`w-full min-w-[160px] h-12 px-5 flex justify-center items-center gap-2 bg-dark-4 text-light-1 rounded-lg`}
            >
              <img
                src={'/assets/icons/edit.svg'}
                alt="edit"
                width={20}
                height={20}
              />
              <p className="flex whitespace-nowrap text-sm font-medium">
                {PROFILE_INFO.EDIT_BUTTON_TEXT}
              </p>
            </Link>
          ) : null}
        </div>
      </div>

      <p className="mt-7 test-sm font-medium md:text-[16px] text-left">
        {userProfile.bio}
      </p>
    </section>
  );
};

export default ProfileInfo;
