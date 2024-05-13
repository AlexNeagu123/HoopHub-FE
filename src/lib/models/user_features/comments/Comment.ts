import type FanInfo from "../fans/FanInfo";
import type { GameThread } from "../threads/GameThread";
import type { TeamThread } from "../threads/TeamThread";
import type { VoteStatus } from "../threads/VoteStatus";

interface Comment {
    id: string;
    parentId: string;
    content: string;
    fan: FanInfo;
    createdDate: Date;
    upVotes: number;
    downVotes: number;
    voteStatus: VoteStatus;
    teamThread: TeamThread | null;
    gameThread: GameThread | null;
    repliesCount: number,
    respondsToFan: FanInfo;
}

export type { Comment }