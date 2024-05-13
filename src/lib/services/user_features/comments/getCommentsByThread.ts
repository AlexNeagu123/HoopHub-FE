import { axiosInstance } from "$lib/constants";
import type { PagedResponse } from "$lib/models/common/Response";
import type { Comment } from "$lib/models/user_features/comments/Comment";

export default async function getCommentsByThread(page: number,
    pageSize: number,
    isPopular: boolean,
    firstCommentId: string | null = null,
    teamThreadId: string | null = null,
    gameThreadId: string | null = null):
    Promise<Comment[]> {
    
        let url = `user-features/comments/?page=${page}&pageSize=${pageSize}&isPopular=${isPopular}`;
    teamThreadId != null ? url += `&teamThreadId=${teamThreadId}` : url += `&gameThreadId=${gameThreadId}`;
    firstCommentId != null ? url += `&firstComment=${firstCommentId}` : null;

    const axiosRes = await axiosInstance.get<PagedResponse<Comment[]>>(url);
    const response = axiosRes.data;
    return response.data;
}