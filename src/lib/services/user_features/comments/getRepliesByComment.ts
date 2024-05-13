import { axiosInstance } from "$lib/constants";
import type { PagedResponse } from "$lib/models/common/Response";
import type { Comment } from "$lib/models/user_features/comments/Comment";

export default async function getRepliesByComment(
    commentId: string | null = null):
    Promise<Comment[]> {
    let url = `user-features/comments/replies/${commentId}`;
    const axiosRes = await axiosInstance.get<PagedResponse<Comment[]>>(url);

    const response = axiosRes.data;
    return response.data;
}