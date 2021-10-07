// Popup or content script requesting the current status
import {Job} from "./Job";
import {SearchContext} from "./SearchContext";

interface DisplayStateRequest {
    type: "REQ_DISPLAY_STATUS";
    source: string;
}


// Background script broadcasting current status
interface DisplayStateResponse {
    type: "DISPLAY_STATUS";
    display: boolean;
    source: string;
}



interface JobProps {
    type: "JOB_PROPS";
    payload: Job[];
    source: string;
}

interface HoverResults {
    type: "HOVER_RESULTS";
    payload: number;
    source?: string;
}



interface JobState {
    type: "JOB_STATE";
    payload: string;
    source: string;
}

interface SettingsStateRequest {
    type: "REQ_SETTINGS_STATUS";
    payload: object;
    source: string;
}

interface SettingsStateResponse {
    type: "SETTINGS_STATUS";
    payload: object;
    source: string;
}

interface SettingsUpdate {
    type: "SETTINGS_UPDATE";
    payload: object;
    source: string;
}

interface ToggleSetting {
    type: "TOGGLE_SETTING";
    payload: string;
    source: string;
}


interface ToggleDisplay {
    type: "TOGGLE_DISPLAY";
    source: string;
}

interface ToggleDecorate {
    type: "TOGGLE_DECORATE";
    source: string;
}

interface JobResultsUpdated {
    type: 'RESULTS_UPDATED';
    payload: number;
    source?: string;
}

interface SearchContextUpdated {
    type: 'SEARCH_CONTEXT_UPDATED';
    payload: SearchContext;
    source: string;
}

interface JobSelected {
    type: 'JOB_SELECTED';
    payload: number;
    source?: string;
}

interface AuthUriRequest {
    type: 'AUTH_URI_RESPONSE';
    source?: string;
    payload: string;
}

interface AuthUriResponse {
    type: 'AUTH_URI_REQUEST';
    source?: string;
    payload: string;
}

interface LoginRequest {
    type: 'LOGIN_REQUEST';
    source?: string;
    payload?: string;
}

interface LoginResponse {
    type: 'LOGIN_RESPONSE';
    source?: string;
    payload?: string;
}

interface LogoutRequest {
    type: 'LOGOUT_REQUEST';
    source?: string;
    payload?: string;
}

interface LogoutResponse {
    type: 'LOGOUT_RESPONSE';
    source?: string;
    payload?: string;
}

export type MessageType =
    DisplayStateRequest | DisplayStateResponse  |
    SettingsStateRequest | SettingsStateResponse |
    SettingsUpdate | JobResultsUpdated |

    // actually used
    JobState | JobProps | ToggleSetting | ToggleDecorate | ToggleDisplay | HoverResults | JobSelected | SearchContextUpdated |
    AuthUriRequest | AuthUriResponse | LoginRequest | LoginResponse | LogoutRequest | LogoutResponse;