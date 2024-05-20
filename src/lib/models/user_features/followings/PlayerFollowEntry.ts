import type FanInfo from "../fans/FanInfo";

interface PlayerFollowEntry {
    fan: FanInfo;
    playerId: string;
}

export type { PlayerFollowEntry }