import { Models } from "appwrite";
import { Link } from "react-router-dom";

import FollowButton from "./FollowButton";

type UserCardProps = {
  data: Models.Document;
};

const UserCard = ({ data }: UserCardProps) => {
  return (
    <div className="flex items-center justify-center flex-col gap-4 border border-dark-4 rounded-[20px] px-5 py-8">
      <Link
        to={`/profile/${data.$id}`}
        className="flex items-center justify-center gap-4"
      >
        <img
          src={data.imageUrl || "/assets/icons/profile-placeholder.svg"}
          alt="creator"
          className="rounded-full w-14 h-14"
        />

        <div className="flex-center flex-col gap-1">
          <p className="text-[16px] font-medium leading-[140%] text-light-1 text-center line-clamp-1">
            {data.name}
          </p>
          <p className="text-[14px] font-normal leading-[140%] text-light-3 text-center line-clamp-1">
            @{data.username}
          </p>
        </div>
      </Link>
      <FollowButton data={data} />
    </div>
  );
};

export default UserCard;
