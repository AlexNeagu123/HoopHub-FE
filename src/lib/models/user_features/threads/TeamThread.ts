import type FanInfo from "$lib/models/user_features/fans/FanInfo";
import type { VoteStatus } from "./VoteStatus";

interface TeamThread {
    id: string;
    teamId: string;
    fanId: string;
    fan: FanInfo;
    title: string;
    content: string;
    createdDate: Date;
    upVotes: number;
    downVotes: number;
    voteStatus: VoteStatus;
    commentsCount: number;
}

export type { TeamThread }