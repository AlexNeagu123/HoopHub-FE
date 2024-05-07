import type FanInfo from "$lib/models/user_features/fans/FanInfo";

interface TeamThread {
    teamId: string;
    fanId: string;
    fan: FanInfo;
    title: string;
    content: string;
    createdDate: Date;
}

export type {TeamThread}