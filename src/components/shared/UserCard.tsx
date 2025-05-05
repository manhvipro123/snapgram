import { Models } from "appwrite";
import { Link } from "react-router-dom";

import { Button } from "../ui/button";

type UserCardProps = {
  user: Models.Document;
};

const UserCard = ({ user }: UserCardProps) => {
  return (
    <Link
      to={`/profile/${user.$id}`}
      className="flex items-center justify-center flex-col gap-4 border border-dark-4 rounded-[20px] px-5 py-8"
    >
      <img
        src={user.imageUrl || "/assets/icons/profile-placeholder.svg"}
        alt="creator"
        className="rounded-full w-14 h-14"
      />

      <div className="flex-center flex-col gap-1">
        <p className="text-[16px] font-medium leading-[140%] text-light-1 text-center line-clamp-1">
          {user.name}
        </p>
        <p className="text-[14px] font-normal leading-[140%] text-light-3 text-center line-clamp-1">
          @{user.username}
        </p>
      </div>

      <Button type="button" size="sm" className=" flex gap-2 px-5">
        Follow
      </Button>
    </Link>
  );
};

export default UserCard;
