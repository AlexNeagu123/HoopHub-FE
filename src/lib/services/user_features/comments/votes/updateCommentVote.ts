import type { TeamThreadVote } from "$lib/models/user_features/threads/TeamThreadVote";
import type { Response } from "$lib/models/common/Response";
import { axiosInstance } from "$lib/constants";
import type { CommentVote } from "$lib/models/user_features/comments/CommentVote";

export default async function updateCommentVote(
    commentId: string,
    isUpVote: boolean
): Promise<CommentVote> {
    const payload = {
        commentId: commentId,
        isUpvote: isUpVote
    };

    const axiosRes = await axiosInstance.put<Response<CommentVote>>(
        `user-features/comment-votes/${commentId}`,
        payload
    );

    const response = axiosRes.data;
    return response.data;
}