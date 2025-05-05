import {
  Route,
  Routes,
  Link,
  Outlet,
  useParams,
  useLocation,
} from "react-router-dom";

import { LikedPosts } from "@/_root/pages";
import {
  useFollowUser,
  useGetCurrentUser,
  useGetUserById,
} from "@/lib/react-query/queriesAndMutation";
import Loader from "@/components/shared/Loader";
import { Button } from "@/components/ui/button";
import GridPostList from "@/components/shared/GridPostList";
import { Models } from "appwrite";
import { toast } from "sonner";

interface StabBlockProps {
  value: string | number;
  label: string;
}

const StatBlock = ({ value, label }: StabBlockProps) => (
  <div className="flex items-center justify-center gap-2">
    <p className="text-[14px] font-medium leading-[140%] lg:body-bold text-primary-500">
      {value}
    </p>
    <p className="flex whitespace-nowrap text-[14px] font-medium leading-[140%] lg:base-medium text-light-2">
      {label}
    </p>
  </div>
);

const Profile = () => {
  const { id } = useParams();
  const { pathname } = useLocation();

  const { data: user } = useGetCurrentUser();
  const { data: currentUser } = useGetUserById(id || "");
  const { mutateAsync: followUser, isPending: isFollowingUser } =
    useFollowUser();

  const handleFollow = async () => {
    // Implement follow functionality here
    console.log(`Followed user with ID: ${currentUser?.$id}`);
    const response = await followUser({
      userId: user?.$id || "",
      followedId: currentUser?.$id || "",
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

  if (!currentUser)
    return (
      <div className="flex items-center justify-center w-full h-full">
        <Loader />
      </div>
    );

  //check is user is already following
  const isFollowing = user?.followings.some(
    (following: Models.Document) => following.followed.$id === currentUser?.$id
  );

  return (
    <div className="flex flex-col items-center flex-1 gap-10 overflow-scroll py-10 px-5 md:p-14 custom-scrollbar">
      <div className="flex items-center md:mb-8 xl:items-start gap-8 flex-col xl:flex-row relative max-w-5xl w-full">
        <div className="flex xl:flex-row flex-col max-xl:items-center flex-1 gap-7">
          <img
            src={
              currentUser.imageUrl || "/assets/icons/profile-placeholder.svg"
            }
            alt="profile"
            className="w-28 h-28 lg:h-36 lg:w-36 rounded-full"
          />
          <div className="flex flex-col flex-1 justify-between md:mt-2">
            <div className="flex flex-col w-full">
              <h1 className="text-center xl:text-left text-[24px] font-bold leading-[140%] tracking-tighter md:text-[36px] md:font-semibold w-full">
                {currentUser.name}
              </h1>
              <p className="text-[14px] font-normal leading-[140%] md:text-[18px] text-light-3 text-center xl:text-left">
                @{currentUser.username}
              </p>
            </div>

            <div className="flex gap-8 mt-10 items-center justify-center xl:justify-start flex-wrap z-20">
              <StatBlock value={currentUser.posts.length} label="Posts" />
              <StatBlock
                value={currentUser.followers.length}
                label="Followers"
              />
              <StatBlock
                value={currentUser.followings.length}
                label="Following"
              />
            </div>

            <p className="text-[14px] font-medium leading-[140%] md:text-[18px] text-center xl:text-left mt-7 max-w-screen-sm">
              {currentUser.bio}
            </p>
          </div>

          <div className="flex justify-center gap-4">
            <div className={`${user?.$id !== currentUser.$id && "hidden"}`}>
              <Link
                to={`/update-profile/${currentUser.$id}`}
                className={`h-12 bg-dark-4 px-5 text-light-1 flex items-center justify-center gap-2 rounded-lg ${
                  user?.$id !== currentUser.$id && "hidden"
                }`}
              >
                <img
                  src={"/assets/icons/edit.svg"}
                  alt="edit"
                  width={20}
                  height={20}
                />
                <p className="flex whitespace-nowrap text-[14px] font-medium leading-[140%]">
                  Edit Profile
                </p>
              </Link>
            </div>
            <div className={`${user?.$id === id && "hidden"}`}>
              <Button
                type="button"
                size="sm"
                className="flex gap-2 px-5 cursor-pointer"
                onClick={handleFollow}
                disabled={isFollowingUser}
              >
                {isFollowing ? (
                  <>
                    <img
                      src="/assets/icons/check-mark.png"
                      alt="followed"
                      width={20}
                      height={20}
                    />
                    <p className="text-[14px] font-medium leading-[140%]">
                      Following
                    </p>
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
          </div>
        </div>
      </div>

      {currentUser.$id === user?.$id && (
        <div className="flex max-w-5xl w-full">
          <Link
            to={`/profile/${id}`}
            className={`flex justify-center items-center gap-3 py-4 w-48 bg-dark-2 transition flex-1 xl:flex-initial rounded-l-lg ${
              pathname === `/profile/${id}` && "!bg-dark-3"
            }`}
          >
            <img
              src={"/assets/icons/posts.svg"}
              alt="posts"
              width={20}
              height={20}
            />
            Posts
          </Link>
          <Link
            to={`/profile/${id}/liked-posts`}
            className={`flex justify-center items-center gap-3 py-4 w-48 bg-dark-2 transition flex-1 xl:flex-initial rounded-r-lg ${
              pathname === `/profile/${id}/liked-posts` && "!bg-dark-3"
            }`}
          >
            <img
              src={"/assets/icons/like.svg"}
              alt="like"
              width={20}
              height={20}
            />
            Liked Posts
          </Link>
        </div>
      )}

      <Routes>
        <Route
          index
          element={<GridPostList posts={currentUser.posts} showUser={false} />}
        />
        {currentUser.$id === user?.$id && (
          <Route path="/liked-posts" element={<LikedPosts />} />
        )}
      </Routes>
      <Outlet />
    </div>
  );
};

export default Profile;
