import {axiosInstance} from "$lib/constants";
import type {TeamThread} from "$lib/models/user_features/threads/TeamThread";
import type {Response} from "$lib/models/common/Response";

export default async function addTeamThread(
    teamId: string,
    title: string,
    content: string
): Promise<TeamThread> {
    const payload = {
        teamId: teamId,
        title: title,
        content: content
    };

    const axiosRes = await axiosInstance.post<Response<TeamThread>>(
        "user-features/team-threads",
        payload
    );

    const response = axiosRes.data;
    return response.data;
}