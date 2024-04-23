import {FanBadge} from "$lib/models/user_features/fans/FanBadge";

export default class FanInfo {
    public fanId: string = "";
    public favouriteTeam: string = "";
    public avatarPhotoUrl: string = "";
    public fanBadge: FanBadge = FanBadge.Rookie;
    public username: string = "";
    public email: string = "";
    public downVotes: number = 0;
    public upVotes: number = 0;
}