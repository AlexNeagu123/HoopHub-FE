export default class CurrentUser {
    public userId: string = "";
    public userRole: string = "";
    public userName: string = "";
    public tokenExpTime: number = 0;
    public isLoggedIn: boolean = false;

    constructor() {
    }
}
