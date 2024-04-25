import type FanInfo from "$lib/models/user_features/fans/FanInfo";
import type {Team} from "$lib/models/nba_data/teams/Team";

export default class ProfilePageInfo {
    public fanInfo: FanInfo;
    public favouriteTeam: Team | null;
    public availableTeams: Team[];

    constructor(fanInfo: FanInfo, favouriteTeam: Team | null, availableTeams: Team[]) {
        this.fanInfo = fanInfo;
        this.favouriteTeam = favouriteTeam;
        this.availableTeams = availableTeams;
    }
}