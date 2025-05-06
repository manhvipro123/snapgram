import { Button } from "../ui/button";
import {
  useFollowUser,
  useGetCurrentUser,
} from "@/lib/react-query/queriesAndMutation";
import { Models } from "appwrite";
import { toast } from "sonner";
import Loader from "./Loader";

const FollowButton = ({ data }: { data: Models.Document }) => {
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
  );
};

export default FollowButton;
