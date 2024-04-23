import FanInfo from "$lib/models/user_features/fans/FanInfo";
import getFanInfo from "$lib/services/user_features/fans/getFanInfo";
import {authToken} from "$lib/stores/auth.store";
import {get} from "svelte/store";


export const load: PageLoad = async () => {
    let fanInfo = new FanInfo();
    if (get(authToken)) {
        fanInfo = await getFanInfo();
    }
    return {fanInfo}
};