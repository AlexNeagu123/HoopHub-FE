import type { Team } from "$lib/models/nba_data/teams/Team";
import type { Response } from "$lib/models/common/Response"
import { axiosInstance } from "$lib/constants";
import type FanInfo from "$lib/models/user_features/fans/FanInfo";

export default async function updateFanInfo(avatarImageFile: File | null, favouriteTeam: Team | null) {
    const formData = new FormData();
    if (avatarImageFile)
        formData.append("ProfileImage", avatarImageFile);

    if (favouriteTeam)
        formData.append("FavouriteTeamId", favouriteTeam.id)

    return await axiosInstance.put<Response<FanInfo>>(`user-features/fans`, formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });
}