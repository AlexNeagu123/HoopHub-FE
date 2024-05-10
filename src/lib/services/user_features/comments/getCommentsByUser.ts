import { axiosInstance } from "$lib/constants";
import type { PagedResponse } from "$lib/models/common/Response";

export default async function getCommentsByUser(page: number, pageSize: number, isPopular: boolean,
    userId: string):
    Promise<Comment[]> {
    let url = `user-features/comments/fan/?page=${page}&pageSize=${pageSize}&isPopular=${isPopular}&userId=${userId}`;

    const axiosRes = await axiosInstance.get<PagedResponse<Comment[]>>(url);
    const response = axiosRes.data;
    return response.data;
}