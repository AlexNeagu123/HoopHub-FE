import {writable} from "svelte/store";
import CurrentUser from "$lib/models/user_access/CurrentUser";
import {storeToken, storeUserDetails} from "$lib/utils/auth-utils";
import {browser} from "$app/environment";

export const currentUser = writable<CurrentUser>(new CurrentUser())
export const authToken = writable<string>("");


const token = browser && localStorage.getItem("authToken");
if (token) {
    storeToken(token);
    storeUserDetails(token);
}