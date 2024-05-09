import { axiosInstance } from "$lib/constants";
import type { TeamThread } from "$lib/models/user_features/threads/TeamThread";
import type { Response } from "$lib/models/common/Response";

export default async function updateTeamThread(
    id: string,
    title: string,
    content: string
): Promise<Response<TeamThread>> {
    const payload = {
        id: id,
        title: title,
        content: content
    };

    const axiosRes = await axiosInstance.put<Response<TeamThread>>(
        `user-features/team-threads/${id}`,
        payload,
        { validateStatus: (status) => (status >= 200 && status < 300) || status === 400 }
    );

    const response = axiosRes.data;
    return response;
}