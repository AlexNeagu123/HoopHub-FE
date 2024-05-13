import { axiosInstance } from "$lib/constants";
import type { Response } from "$lib/models/common/Response";
import type { CommentVote } from "$lib/models/user_features/comments/CommentVote";

export default async function addCommentVote(
    commentId: string,
    isUpVote: boolean
): Promise<CommentVote> {
    const payload = {
        commentId: commentId,
        isUpvote: isUpVote
    };

    const axiosRes = await axiosInstance.post<Response<CommentVote>>(
        "user-features/comment-votes",
        payload,
    );

    const response = axiosRes.data;
    return response.data;
}