import type { TeamThreadVote } from "$lib/models/user_features/threads/TeamThreadVote";
import type { Response } from "$lib/models/common/Response";
import { axiosInstance } from "$lib/constants";

export default async function updateTeamThreadVote(
    threadId: string,
    isUpVote: boolean
): Promise<TeamThreadVote> {
    const payload = {
        threadId: threadId,
        isUpvote: isUpVote
    };

    const axiosRes = await axiosInstance.put<Response<TeamThreadVote>>(
        `user-features/thread-votes/${threadId}`,
        payload
    );

    const response = axiosRes.data;
    return response.data;
}