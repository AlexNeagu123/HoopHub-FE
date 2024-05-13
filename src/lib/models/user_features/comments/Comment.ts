import type FanInfo from "../fans/FanInfo";
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
    repliesCount: number
}

export type { Comment }