import type FanInfo from "../fans/FanInfo";
import type { TeamThread } from "./TeamThread";

interface TeamThreadVote {
    fan: FanInfo;
    teamThread: TeamThread;
    isUpVote: boolean;
}

export type { TeamThreadVote }