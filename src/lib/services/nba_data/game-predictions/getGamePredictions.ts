import { axiosInstance } from "$lib/constants";
import type { Response } from "$lib/models/common/Response"
import type { GamePrediction } from "$lib/models/nba_data/game-predictions/GamePrediction";

export default async function getGamePredictions(date: string, homeTeamId: number, visitorTeamId: number): Promise<Response<GamePrediction>> {
    const axiosRes =
        await axiosInstance.get<Response<GamePrediction>>(`nba-data/game-prediction?Date=${date}&HomeTeamId=${homeTeamId}&VisitorTeamId=${visitorTeamId}`,
            { timeout: 30000, validateStatus: (status) => (status >= 200 && status < 300) || status === 400 }
        );

    const response = axiosRes.data;
    return response;
}