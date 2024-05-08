import { axiosInstance } from "$lib/constants";
import type { Response } from "$lib/models/common/Response";
import type { TeamThreadVote } from "$lib/models/user_features/threads/TeamThreadVote";

export default async function addTeamThreadVote(
    threadId: string,
    isUpVote: boolean
): Promise<TeamThreadVote> {
    const payload = {
        threadId: threadId,
        isUpvote: isUpVote
    };

    const axiosRes = await axiosInstance.post<Response<TeamThreadVote>>(
        "user-features/thread-votes",
        payload,
    );

    const response = axiosRes.data;
    return response.data;
}