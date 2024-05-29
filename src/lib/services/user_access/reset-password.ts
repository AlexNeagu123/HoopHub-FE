import type { Response } from "$lib/models/common/Response"

import axios from 'axios'
import type { UserDto } from "$lib/models/user_access/UserDto";
import type ResetPasswordModel from "$lib/models/user_access/ResetPasswordModel";

export default async function resetPassword(resetPasswordModel: ResetPasswordModel): Promise<Response<UserDto>> {
    const axiosRes = await axios.patch<Response<UserDto>>('reset-password', resetPasswordModel,
        { validateStatus: (status: number) => (status >= 200 && status < 300) || status === 401 });
    return axiosRes.data;
}