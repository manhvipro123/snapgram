import Loader from "@/components/shared/Loader";
import PostStats from "@/components/shared/PostStats";
import { Button } from "@/components/ui/button";
import { useUserContext } from "@/context/AuthContext";
import { useGetPostById } from "@/lib/react-query/queriesAndMutation";
import { multiFormatDateString } from "@/lib/utils";
import { Link, useParams } from "react-router-dom";

const PostDetails = () => {
  const { id } = useParams();
  const { data: post, isPending } = useGetPostById(id || "");
  const { user } = useUserContext();

  const handleDeletePost = async () => {};

  return (
    <div className="flex flex-col flex-1 gap-10 overflow-scroll py-10 px-5 md:p-14 custom-scrollbar items-center">
      {isPending ? (
        <Loader />
      ) : (
        <div className="bg-dark-2 w-full max-w-5xl rounded-[30px] flex-col flex xl:flex-row border border-dark-4 xl:rounded-l-[24px]">
          <img
            src={post?.imageUrl}
            alt="Post image"
            className=" h-80 lg:h-[480px] xl:w-[48%] rounded-t-[30px] xl:rounded-l-[24px] xl:rounded-tr-none object-cover p-5 bg-dark-1"
          />
          <div className="bg-dark-2 flex flex-col gap-5 lg:gap-7 flex-1 items-start p-8 rounded-[30px]">
            <div className="flex justify-between items-center w-full">
              <Link
                to={`/profile/${post?.creator.$id}`}
                className="flex items-center gap-3"
              >
                <img
                  className="rounded-full w-8 h-8 lg:h-12 lg:w-12"
                  src={
                    post?.creator.imageUrl ||
                    "/assets/icons/profile-placeholder.svg"
                  }
                  alt="avatar"
                />

                <div className="flex flex-col">
                  <p className="text-[16px] font-medium leading-[140%] lg:text-[18px] lg:font-bold lg:leading-[140%] text-light-1">
                    {post?.creator.name}
                  </p>
                  <div className="flex items-center justify-center gap-2 text-light-3">
                    <p className="text-[12px] font-semibold leading-[140%] lg:text-[14px] lg:font-normal lg:leading-[140%]">
                      {multiFormatDateString(post?.$createdAt)}
                    </p>
                    -
                    <p className="text-[12px] font-semibold leading-[140%] lg:text-[14px] lg:font-normal lg:leading-[140%]">
                      {post?.location}
                    </p>
                  </div>
                </div>
              </Link>

              <div className="flex items-center justify-center gap-4">
                <Link
                  to={`/update-post/${post?.$id}`}
                  className={`${user.id !== post?.creator.$id && "hidden"}`}
                >
                  <img
                    src="/assets/icons/edit.svg"
                    alt="edit"
                    width={24}
                    height={24}
                  />
                </Link>

                <Button
                  variant="ghost"
                  onClick={handleDeletePost}
                  className={`${user.id !== post?.creator.$id && "hidden"}`}
                >
                  <img
                    src="/assets/icons/delete.svg"
                    alt="delete"
                    width={24}
                    height={24}
                  />
                </Button>
              </div>
            </div>

            <hr className="border w-full border-dark-4/80" />

            <div className="flex flex-col flex-1 w-full text-[14px] font-medium leading-[140%] lg:text-[16px] lg:font-normal lg:leading-[140%]">
              <p>{post?.caption}</p>
              <ul className="flex gap-1 mt-2">
                {post?.tags.map((tag: string, index: number) => (
                  <li
                    key={index}
                    className=" text-light-3 text-[14px] font-normal leading-[140%]"
                  >
                    #{tag}
                  </li>
                ))}
              </ul>
            </div>

            <div className="w-full">
              <PostStats post={post} userId={user.id} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostDetails;
