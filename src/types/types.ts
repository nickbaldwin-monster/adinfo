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



interface LoginStarted {
    type: 'LOGIN_STARTED';
    source: string;
    payload: number;
}

interface LoginCompleted {
    type: 'LOGIN_COMPLETED';
    source: string;
    payload: number;
}

interface LoginChecked {
    type: 'LOGIN_CHECKED';
    source: string;
    payload: number;
}

interface Logout {
    type: 'LOGOUT';
    source?: string;
}

interface AuthFlowStatusRequest {
    type: 'AUTH_FLOW_STATUS_REQUEST';
    source: string;
}

interface AuthFlowStatusResponse {
    type: 'AUTH_FLOW_STATUS_RESPONSE';
    source: string;
    payload: boolean;
}

interface AuthStatusResponse {
    type: 'AUTH_STATUS_RESPONSE';
    source: string;
    payload: boolean;
}

interface AuthStatusRequest {
    type: 'AUTH_STATUS_REQUEST';
    source: string;
}



interface Check {
    type: 'CHECK';
    source?: string;
    payload?: string;
    target?: string;
}


interface CheckResponse {
    type: 'CHECK_RESPONSE';
    source?: string;
    payload?: string;
    target?: string;
}

interface ToggleDisplayDevInfo {
    type: 'TOGGLE_DISPLAY_DEV_INFO';
    source: string;
}

export type MessageType =
    DisplayStateRequest | DisplayStateResponse  |
    SettingsStateRequest | SettingsStateResponse |
    SettingsUpdate | JobResultsUpdated |

    // actually used
    ToggleDisplayDevInfo |
    Check | CheckResponse |
    JobState | JobProps | ToggleSetting | ToggleDecorate | ToggleDisplay | HoverResults | JobSelected | SearchContextUpdated |
    AuthUriRequest | AuthUriResponse |
    LoginStarted | LoginCompleted | LoginChecked | Logout |
    AuthStatusRequest | AuthStatusResponse | AuthFlowStatusRequest | AuthFlowStatusResponse;
