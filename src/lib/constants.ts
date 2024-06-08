import { seasonFromIntToStr } from "$lib/utils/standings-utils";
import { authToken } from "$lib/stores/auth.store";
import { get } from "svelte/store";
import axios from "axios";
import { removeToken } from "./utils/auth-utils";
import JwtParser from "./utils/jwt-parser";

export const axiosInstance = axios.create({
    timeout: 30000,
    headers: {
        'Content-Type': 'application/json'
    }
});

axiosInstance.interceptors.request.use(
    function (config) {
        const token = get(authToken);
        if (!token) {
            return config;
        }

        const jwtParser = new JwtParser(token);
        if (jwtParser.isJwtExpired()) {
            removeToken();
            window.location.href = AppRoute.TEAMS;
        }
        config.headers['Authorization'] = `Bearer ${token}`;
        return config;
    },
    function (error) {
        console.error('Request error:', error);
        return Promise.reject(error);
    }
);

export enum WebSockets {
    BOX_SCORE_SOCKET_URL = 'box-scores-live',
    BOX_SCORES_CHANNEL = 'ReceiveLiveBoxScores'
}

export enum AppRoute {
    HOME = '/',
    LOGIN = '/login',
    REGISTER = '/register',
    TEAMS = '/teams',
    TEAM = '/team',
    PLAYER = '/player',
    GAMES = '/games',
    GAME = '/game',
    STANDINGS = '/standings',
    PLAYOFFS = '/playoffs',
    LOGOUT = "/logout",
    PROFILE = "/profile",
    TEAM_THREAD = "/team-thread",
    GAME_THREAD = "/game-thread",
    GAME_REVIEWS = "/game-reviews",
    GAME_PERFORMANCES = "/game-performances",
    IDENTIFY = "/login/identify",
    SETTINGS = "/profile/settings",
}

export enum TeamConstants {
    seasonsGroupSize = 8
}

export enum PlayerConstants {
    seasonGroupSize = 4
}

export enum SeasonConstants {
    currentSeason = 2023,
    minStandingsSeason = 1970
}

export enum TableTypes {
    playerTable = 0,
    teamTable = 1,
    boxScoreType = 2
}

function generateAvailableSeasons() {
    const availableSeasons = [];
    for (let year = SeasonConstants.minStandingsSeason; year <= SeasonConstants.currentSeason; year++) {
        const season = seasonFromIntToStr(year);
        availableSeasons.push(season);
    }
    return availableSeasons.reverse();
}

export enum StandingGroups {
    CONFERENCE = "Conference",
    DIVISION = "Division",
    ALL = "All"
}

export enum PlayoffBorderTypes {
    LEFT = 0,
    RIGHT = 1,
    NONE = 2
}

export enum TruncateLengths {
    ThreadContent = 60,
}

export const playoffRounds = ["Western Conference First Round", "Western Conference Semifinals", "Western Conference Finals", "Finals",
    "Eastern Conference Finals", "Eastern Conference Semifinals", "Eastern Conference First Round"]

export const standingsAvailableSeasons = generateAvailableSeasons();
export const standingsGroups = ["Conference", "Division", "All"]

export type InformativePopUps = {
    [key: string]: string
}
export const informativePopUps: InformativePopUps = {
    "W-L %": "Win Loss Percentage",
    "ORTG": "An estimate of points produced or scored per 100 possessions",
    "DRTG": "An estimate of points allowed per 100 possessions",
    "PACE": "An estimate of possessions per 48 minutes",
    "SRS": "Team rating that takes into account average point differential and strength of schedule",
    "W": "Wins",
    "L": "Losses",
    "Finish": "Regular season finish (within division)",
    "Rel PACE": "Team's possessions per 48 minutes relative to the league",
    "GP": "Games Played",
    "PPG": "Points Per Game",
    "PTS": "Points Per Game",
    "REB": "Rebounds Per Game",
    "AST": "Assists Per Game",
    "BLK": "Blocks Per Game",
    "STL": "Steals Per Game",
    "FGM": "Field Goals Made",
    "FGA": "Field Goals Attempted",
    "FG%": "Field Goal Percentage",
    "3PM": "Three Point Shots Made",
    "3PA": "Three Point Shots Attempted",
    "3P%": "Three Point Shot Percentage",
    "FTM": "Free Throws Made",
    "FTA": "Free Throws Attempted",
    "FT%": "Free Throw Percentage",
    "TOV": "Turnovers",
    "Eastern": "Record against Eastern Conference",
    "Western": "Record against Western Conference",
    "Upvotes": "Number of upvotes",
    "Downvotes": "Number of downvotes",
    "Comments": "Number of comments",
    "Reviews": "Number of reviews",
    "OFFRTG": "An estimate of points produced or scored per 100 possessions",
    "DEFRTG": "An estimate of points allowed per 100 possessions",
    "NETRTG": "Difference between offensive rating and defensive rating",
    "AST%": "Percentage of teammate field goals a player assisted while on the floor",
    "AST/TO": "Ratio of assists to turnovers",
    "AST RATIO": "Number of assists per 100 possessions",
    "OREB%": "Percentage of available offensive rebounds a player grabbed while on the floor",
    "DREB%": "Percentage of available defensive rebounds a player grabbed while on the floor",
    "REB%": "Percentage of available rebounds a player grabbed while on the floor",
    "TO RATIO": "Turnovers per 100 possessions",
    "EFG%": "Field goal percentage adjusted for the value of 3-point field goals",
    "TS%": "A measure of shooting efficiency that takes into account field goals, 3-point field goals, and free throws",
    "USG%": "An estimate of the percentage of team plays used by a player while on the floor",
    "PIE": "Player Impact Estimate, a measure of a player's overall statistical contribution against the total statistics in games they play in"
}

export enum TeamPageTypes {
    ROSTER = "roster",
    BIO = "bio",
    LATEST = "latest",
    THREADS = "threads"
}

export enum ProfilePageTypes {
    THREADS = "threads",
    COMMENTS = "comments",
    REVIEWS = "reviews",
    FOLLOWING = "following",
}


export enum GamePageTypes {
    BOX_SCORE = "box-score",
    CHARTS = "charts",
    THREAD = "thread",
    REVIEWS = "reviews",
    PERFORMANCES = "performances"
}

export enum NotificationComponentTypes {
    UNREAD,
    ALL
}

export enum DynamicPaginationThresholds {
    TeamThreadsThreshold = 4,
    CommentsThreshold = 4,
    NotificationsThreshold = 8,
    GameReviewsThreshold = 4
}

export const noFavouriteTeamImageUrl: string = "https://hoophub.blob.core.windows.net/userphotos/question.png";

export enum ToastMessages {
    actionRequiresLogIn = "You should be logged in to perform this action",
    noGameThread = "No thread exists for this game",
    gameNotStarted = "The game has not started yet",
}

export const FollowMessage = (teamName: string) => {
    return `You are now following ${teamName}`;
}

export const UnfollowedMessage = (teamName: string) => {
    return `You are no longer following ${teamName}`;
}

export enum ThreadWidthTypes {
    FULL = "full",
    HALF = "half"
}

export const ThreadWidthTypesConverter: { [key: string]: string } = {
    "full": "w-[80%]",
    "half": "w-[48%]"
}

export const starConfig = {
    size: 40,
    fillColor: '#F9ED4F',
    strokeColor: "#BB8511",
    unfilledColor: '#FFF',
    strokeUnfilledColor: '#000'
};

export const GameStarRatingConfig = {
    readOnly: false,
    countStars: 5,
    range: {
        min: 0,
        max: 5,
        step: 0.1
    },
    score: 0.0,
    showScore: false,
    starConfig: starConfig
}

const lowStarColor = '#bf176a';
const midStarColor = '#d3a107';
const highStarColor = '#77b814';

export function getDynamicStarConfig(score: number | null, starSize: number = 20) {
    if (score === null) {
        score = 0;
    }

    let fillColor = score < 2.5 ? lowStarColor : score < 4 ? midStarColor : highStarColor;

    return {
        size: starSize,
        fillColor: fillColor,
        strokeColor: '#BB8511',
        unfilledColor: '#FFF',
        strokeUnfilledColor: '#000'
    }
}

export const starRange = {
    min: 0,
    max: 5,
    step: 0.1
}

export const headBoxScoreFieldsForSorting: string[] = [
    'MIN',
    'PTS',
    'REB',
    'AST',
    'STL',
    'BLK',
    'FGM',
    'FGA',
    'FG%',
    '3PM',
    '3PA',
    '3P%',
    'FTM',
    'FTA',
    'FT%',
    'TOV'
];

export const updatableBoxScoreDtoProps: string[] = [
    'min',
    'pts',
    'reb',
    'ast',
    'stl',
    'blk',
    'fgm',
    'fga',
    'fgPct',
    'fg3m',
    'fg3a',
    'fg3Pct',
    'ftm',
    'fta',
    'ftPct',
    'turnover'
];

export const displayFieldsForAdvancedStatsEntry: string[] = [
    'MIN',
    'OFFRTG',
    'DEFRTG',
    'NETRTG',
    'AST%',
    'AST/TO',
    'AST RATIO',
    'OREB%',
    'DREB%',
    'REB%',
    'TO RATIO',
    'EFG%',
    'TS%',
    'USG%',
    'PACE',
    'PIE'
];

export const updatableFieldsForAdvancedStatsEntry: string[] = [
    'min',
    'offensiveRating',
    'defensiveRating',
    'netRating',
    'assistPercentage',
    'assistToTurnover',
    'assistRatio',
    'offensiveReboundPercentage',
    'defensiveReboundPercentage',
    'reboundPercentage',
    'turnoverRatio',
    'effectiveFieldGoalPercentage',
    'trueShootingPercentage',
    'usagePercentage',
    'pace',
    'pie'
];

export const gameStatsTypes = [
    "Traditional",
    "Advanced"
]

export const rankTexts = ["Rookie", "Regular", "Expert", "Goat"]
export const rankColors = ["text-gray-500", "text-green-600", "text-orange-600", "text-red-800"]
export const latestGameOptions = [5, 10, 15, 30];

export enum commentListTypes {
    NEWEST = "Newest",
    POPULAR = "Popular"
}


export enum commentsListQueryParams {
    SORTING_TYPE = "sortingType",
    FIRST_COMMENT = "firstComment"
}

export enum FollowingPageTypes {
    TEAMS = "teams",
    PLAYERS = "players"
}