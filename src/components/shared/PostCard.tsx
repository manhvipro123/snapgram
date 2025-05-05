import { useUserContext } from "@/context/AuthContext";
import { multiFormatDateString } from "@/lib/utils";
import { Models } from "appwrite";
import { Link } from "react-router-dom";
import PostStats from "./PostStats";

type PostCardProps = {
  post: Models.Document;
};

const PostCard = ({ post }: PostCardProps) => {
  const { user } = useUserContext();

  if (!post.creator) return;

  const isCreator = user.id === post.creator.$id;

  return (
    <div className="bg-dark-2 rounded-3xl border border-dark-4 p-5 lg:p-7 w-full max-w-screen-sm">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Link to={`/profile/${post.creator.$id}`}>
            <img
              className="rounded-full w-12 lg:h-12"
              src={
                post?.creator.imageUrl ||
                "/assets/icons/profile-placeholder.svg"
              }
              alt="avatar"
            />
          </Link>

          <div className="flex flex-col">
            <p className="text-[16px] font-medium leading-[140%] lg:text-[18px] lg:font-bold lg:leading-[140%] text-light-1">
              {post?.creator.name}
            </p>
            <div className="flex items-center justify-center gap-2 text-light-3">
              <p className="text-[12px] font-semibold leading-[140%] lg:text-[14px] lg:font-normal lg:leading-[140%]">
                {multiFormatDateString(post.$createdAt)}
              </p>
              -
              <p className="text-[12px] font-semibold leading-[140%] lg:text-[14px] lg:font-normal lg:leading-[140%]">
                {post.location}
              </p>
            </div>
          </div>
        </div>

        <Link
          to={`/update-post/${post.$id}`}
          className={`${!isCreator && "hidden"}`}
        >
          <img src="/assets/icons/edit.svg" alt="edit" width={20} height={20} />
        </Link>
      </div>

      <Link to={`/post/${post.$id}`}>
        <div className="text-[14px] font-medium leading-[140%] lg:text-[16px] lg:font-medium lg:leading-[140%] py-5">
          <p>{post.caption}</p>
          <ul className="flex gap-1 mt-2">
            {post.tags.map((tag: string, index: number) => (
              <li
                key={index}
                className=" text-light-3 text-[14px] font-normal leading-[140%]"
              >
                #{tag}
              </li>
            ))}
          </ul>
        </div>
        <img
          src={post.imageUrl || "/assets/icons/profile-placeholder.svg"}
          alt="post image"
          className="h-64 xs:h-[400px] lg:h-[450px] w-full rounded-[24px] object-cover mb-5"
        />
      </Link>

      <PostStats post={post} userId={user.id} />
    </div>
  );
};

export default PostCard;
