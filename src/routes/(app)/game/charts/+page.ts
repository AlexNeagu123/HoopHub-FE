import type {PageLoad} from "./$types";
import loadBoxScores from "../box-score-loader";


export const load: PageLoad = async ({url}) => {
    return loadBoxScores(url);
};