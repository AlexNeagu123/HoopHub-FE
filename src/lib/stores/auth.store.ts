import {writable} from "svelte/store";
import CurrentUser from "$lib/models/user_access/CurrentUser";

export const currentUser = writable<CurrentUser>(new CurrentUser())
export const authToken = writable<string>("");