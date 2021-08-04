// this is run as a popup script, displayed when the extension's icon is clicked

import * as React from "react";
import * as ReactDOM from "react-dom";

import { MessageType } from "./types";
import { logger } from "./helpers/logger";
import Settings from "./panels/Settings";
import "./popup.css";



const handleMessage = (message: MessageType) => {
    log({
        logType: 'MESSAGE_RECEIVED',
        functionName: 'N/A',
        payload: message
    });
    if (message.type === "SETTINGS_UPDATE") {
        // todo - apply settings?
    }
};


// #####
// ##### MAIN
// #####

// log
const moduleName = 'popup';
const log = logger(moduleName);
log({ logType: 'LOADED' });

// listen to messages
chrome.runtime.onMessage.addListener((message: MessageType) => {
    handleMessage(message);
});

// todo register listener attached?

// display setting in popup
const mountNode = document.getElementById("popup");
ReactDOM.render(<Settings />, mountNode);





