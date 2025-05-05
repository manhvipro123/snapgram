import { Models } from "appwrite";
import { Link } from "react-router-dom";

import { Button } from "../ui/button";
import {
  useFollowUser,
  useGetCurrentUser,
} from "@/lib/react-query/queriesAndMutation";
import { toast } from "sonner";
import Loader from "./Loader";

type UserCardProps = {
  data: Models.Document;
};

const UserCard = ({ data }: UserCardProps) => {
  const { data: user, isPending: isGettingCurrentUser } = useGetCurrentUser();

  const { mutateAsync: followUser, isPending: isFollowingUser } =
    useFollowUser();

  //check is user is already following
  const isFollowing = user?.followings.some(
    (following: Models.Document) => following.followed.$id === data.$id
  );
  //check if user is the same as the logged in user

  const handleFollow = async () => {
    // Implement follow functionality here
    console.log(`Followed user with ID: ${data.$id}`);
    const response = await followUser({
      userId: user?.$id || "",
      followedId: data.$id,
    });

    if (response) {
      toast.success("User followed successfully", {
        description: "You are now following this user.",
      });
    } else {
      toast.error("Failed to follow user", {
        description: "Please try again later.",
      });
    }
  };

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
      <Button
        type="button"
        size="sm"
        className=" flex gap-2 px-5 cursor-pointer"
        onClick={handleFollow}
        disabled={isFollowingUser || isGettingCurrentUser}
      >
        {isFollowing ? (
          <>
            <img
              src="/assets/icons/check-mark.png"
              alt="followed"
              width={20}
              height={20}
            />
            <p className="text-[14px] font-medium leading-[140%]">Following</p>
          </>
        ) : (
          <>
            <div className="text-[14px] font-medium leading-[140%]">
              {isFollowingUser ? <Loader /> : "Follow"}
            </div>
          </>
        )}
      </Button>
    </div>
  );
};

export default UserCard;
