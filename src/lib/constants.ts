import { seasonFromIntToStr } from "$lib/utils/standings-utils";
import { authToken } from "$lib/stores/auth.store";
import { goto } from "$app/navigation";
import { get } from "svelte/store";
import axios from "axios";

export enum WebSockets {
    BOX_SCORE_SOCKET_URL = 'wss://localhost:5001/box-scores-live',
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
    REVIEWS = "reviews"
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
export const axiosInstance = axios.create();

export function refreshPage() {
    window.location.reload();
}

axiosInstance.interceptors.request.use(
    function (config) {
        const token = get(authToken);
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    }
);

axios.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        if (error.response && error.response.status === 401) {
            goto('/login');
        }
        return Promise.reject(error);
    }
);

export enum ToastMessages {
    actionRequiresLogIn = "You should be logged in to perform this action",
    noGameThread = "No thread exists for this game",
    gameNotStarted = "The game has not started yet"
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