import type {Response} from "$lib/models/common/Response"
import type {UserDto} from "$lib/models/user_access/UserDto";

import axios from 'axios'
import RegistrationModel from "$lib/models/user_access/RegistrationModel";

async function register(userData: RegistrationModel): Promise<Response<UserDto>> {
    const axiosRes = await axios.post<Response<UserDto>>('register', userData,
        { validateStatus: (status) => (status >= 200 && status < 300) || status === 400 });
    return axiosRes.data;
}

export default register