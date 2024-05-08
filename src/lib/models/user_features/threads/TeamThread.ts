import type FanInfo from "$lib/models/user_features/fans/FanInfo";
import type { ThreadVoteStatus } from "./ThreadVoteStatus";

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
    voteStatus: ThreadVoteStatus;
}

export type { TeamThread }