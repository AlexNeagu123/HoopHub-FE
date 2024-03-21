import type {Response} from "$lib/models/common/Response"
import type {UserDto} from "$lib/models/user_access/UserDto";

import axios from 'axios'
import type {RegistrationModel} from "$lib/models/user_access/RegistrationModel";

declare const API_PATH: string;

async function register(userData: RegistrationModel): Promise<Response<UserDto>> {
    const axiosRes = await axios.post<Response<UserDto>>(`${API_PATH}register`, userData,
        { validateStatus: (status) => (status >= 200 && status < 300) || status === 400 });
    return axiosRes.data;
}

export {register}