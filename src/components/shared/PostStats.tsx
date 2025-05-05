import {
  useDeleteSavedPost,
  useGetCurrentUser,
  useLikePost,
  useSavePost,
} from "@/lib/react-query/queriesAndMutation";
import { Models } from "appwrite";
import React, { useEffect, useState } from "react";
import Loader from "./Loader";
import { checkIsLiked } from "@/lib/utils";

type PostStatProps = {
  post?: Models.Document;
  userId: string;
};

const PostStats = ({ post, userId }: PostStatProps) => {
  const likesList = post?.likes.map((user: Models.Document) => user.$id) || [];

  const [likes, setLikes] = useState<string[]>(likesList);
  const [isSaved, setIsSaved] = useState(false);

  const { mutate: likePost, isPending: isLikingPost } = useLikePost();
  const { mutate: savePost, isPending: isSavingPost } = useSavePost();
  const { mutate: deleteSavedPost, isPending: isDeletingSaved } =
    useDeleteSavedPost();

  const { data: currentUser } = useGetCurrentUser();

  const savedPostRecord = currentUser?.save.find(
    (record: Models.Document) => record.post.$id === post?.$id
  );

  useEffect(() => {
    setIsSaved(!!savedPostRecord);
  }, [currentUser]);

  const handleLikePost = (e: React.MouseEvent) => {
    e.stopPropagation();

    let newLikes = [...likes];

    const hasLiked = newLikes.includes(userId);

    if (hasLiked) {
      newLikes = newLikes.filter((like) => like !== userId);
    } else {
      newLikes.push(userId);
    }

    setLikes(newLikes);
    likePost({ postId: post?.$id || "", likesArray: newLikes });
  };

  const handleSavePost = (e: React.MouseEvent) => {
    e.stopPropagation();

    const savedPostRecord = currentUser?.save.find(
      (record: Models.Document) => record.post.$id === post?.$id
    );
    if (savedPostRecord) {
      setIsSaved(false);
      deleteSavedPost({ savedRecordId: savedPostRecord.$id });
    } else {
      savePost({ postId: post?.$id || "", userId });
      setIsSaved(true);
    }
  };

  return (
    <div className="flex justify-between items-center z-20">
      <div className="flex gap-2 mr-5">
        {isLikingPost ? (
          <Loader isOnBackground={true} />
        ) : (
          <>
            {" "}
            <img
              src={`${
                checkIsLiked(likes, userId)
                  ? "/assets/icons/liked.svg"
                  : "/assets/icons/like.svg   "
              }`}
              alt="liked"
              width={20}
              height={20}
              onClick={handleLikePost}
              className="cursor-pointer"
            />
            <p className="text-[14px] font-semibold leading-[140%] lg:text-[16px] lg:font-normal lg:leading-[140%]">
              {post?.likes.length}
            </p>
          </>
        )}
      </div>
      <div className="flex gap-2">
        {isDeletingSaved || isSavingPost ? (
          <Loader isOnBackground={true} />
        ) : (
          <img
            src={`${
              isSaved ? "/assets/icons/saved.svg" : "/assets/icons/save.svg   "
            }`}
            alt="saved"
            width={20}
            height={20}
            onClick={handleSavePost}
            className="cursor-pointer"
          />
        )}
      </div>
    </div>
  );
};

export default PostStats;
