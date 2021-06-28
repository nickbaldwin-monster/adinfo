// Popup or content script requesting the current status
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

// Popup requesting background script for status change
interface DisplayToggle {
    type: "TOGGLE_DISPLAY";
    display: boolean;
    source: string;
}


interface JobState {
    type: "JOB_STATE";
    payload: object;
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


export type MessageType =
    DisplayStateRequest | DisplayStateResponse | DisplayToggle |
    SettingsStateRequest | SettingsStateResponse | SettingsUpdate |
    JobState;