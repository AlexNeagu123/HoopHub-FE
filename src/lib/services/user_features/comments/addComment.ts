// import {axiosInstance} from "$lib/constants";
// import type {TeamThread} from "$lib/models/user_features/threads/TeamThread";
// import type {Response} from "$lib/models/common/Response";

// export default async function addComment(
//     content: string,
//     teamThreadId: string | null = null,
//     gameThreadId: string | null = null
// ): Promise<Response<TeamThread>> {
//     const payload = {
//         teamId: teamId,
//         title: title,
//         content: content
//     };

//     const axiosRes = await axiosInstance.post<Response<TeamThread>>(
//         "user-features/team-threads",
//         payload,
//         { validateStatus: (status) => (status >= 200 && status < 300) || status === 400 }
//     );

//     const response = axiosRes.data;
//     return response;
// }