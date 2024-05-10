import { axiosInstance } from "$lib/constants";
import type { Response } from "$lib/models/common/Response";

export default async function addReplyComment(
    content: string,
    parentId: string,
    teamThreadId: string | null = null,
    gameThreadId: string | null = null
): Promise<Response<Comment>> {
    const payload = {
        content: content,
        pareCommentId: parentId,
        teamThreadId: teamThreadId,
        gameThreadId: gameThreadId
    };

    const axiosRes = await axiosInstance.post<Response<Comment>>(
        "user-features/comments/reply",
        payload,
        { validateStatus: (status) => (status >= 200 && status < 300) || status === 400 }
    );

    const response = axiosRes.data;
    return response;
}