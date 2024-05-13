import type FanInfo from "../fans/FanInfo";

interface CommentVote {
    fan: FanInfo;
    teamThread: Comment;
    isUpVote: boolean;
}

export type { CommentVote }