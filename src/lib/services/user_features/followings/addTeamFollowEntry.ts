import { axiosInstance } from "$lib/constants";
import type { Response } from "$lib/models/common/Response";
import type { PlayerFollowEntry } from "$lib/models/user_features/followings/PlayerFollowEntry";
import type { TeamFollowEntry } from "$lib/models/user_features/followings/TeamFollowEntry";

export default async function addTeamFollowEntry(
    teamId: string
): Promise<TeamFollowEntry> {
    const payload = {
        teamId: teamId
    };

    const axiosRes = await axiosInstance.post<Response<TeamFollowEntry>>(
        "user-features/team-follows",
        payload
    );

    const response = axiosRes.data;
    return response.data;
}