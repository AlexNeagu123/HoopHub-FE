export default class CurrentUser {
    userId: string = "";
    userRole: string = "";
    userName: string = "";
    tokenExpTime: number = 0;
    isLoggedIn: boolean = false;

    public constructor(userId: string, userRole: string, userName: string, tokenExpTime: number) {
        this.userId = userId;
        this.userRole = userRole;
        this.userName = userName;
        this.tokenExpTime = tokenExpTime;
        this.isLoggedIn = true;
    }
}
