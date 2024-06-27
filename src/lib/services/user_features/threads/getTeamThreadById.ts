import { axiosInstance } from "$lib/constants";
import type { TeamThread } from "$lib/models/user_features/threads/TeamThread";
import type { Response } from "$lib/models/common/Response";

export default async function getTeamThreadById(id: string): Promise<TeamThread> {
    const axiosRes = await axiosInstance.get<Response<TeamThread>>(`user-features/team-threads/${id}`);
    const response = axiosRes.data;
    return response.data;
}

