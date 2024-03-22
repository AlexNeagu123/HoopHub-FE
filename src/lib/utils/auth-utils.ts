import {authToken, currentUser} from "$lib/stores/auth.store";
import CurrentUser from "$lib/models/user_access/CurrentUser";
import {ClaimTypes} from "$lib/constants";
import JwtParser from "$lib/utils/jwt-parser";

export function storeToken(token: string): void {
    localStorage.setItem('authToken', token);
    authToken.set(token);
}

export function extractLoggedUserInfo(claims: { [key: string]: string }): CurrentUser {
    return {
        isLoggedIn: true,
        userId: claims[ClaimTypes.USERID],
        userRole: claims[ClaimTypes.USERROLE],
        userName: claims[ClaimTypes.USERNAME],
        tokenExpTime: Number(claims[ClaimTypes.EXP_TIME])
    };
}

export function storeUserDetails(token: string) {
    const jwtParser = new JwtParser(token);
    const claims = jwtParser.parseClaimsFromJwt();
    currentUser.set(extractLoggedUserInfo(claims));
}
