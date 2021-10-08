// this is run as a background script (visible only by clicking inspect
// on the extension's background page (within chrome://extensions/)

// run as a separate instance in browser
// used to manage a browser wide state via messages

import { MessageType } from "./types/types";
import { logger } from "./helpers/logger";

import { subscribeToExtensionMessages, subscribeToWindowMessages,
    sendMessageToBackgroundAndPopup, sendMessageToContent
} from "./helpers/messaging";

const moduleName = 'background';
let log = logger(moduleName);
log({ logType: 'LOADED' });


// default state
let display = false;


const sendSetting = (setting: string) => {
    const message: MessageType = {
        type: "TOGGLE_SETTING",
        payload: setting,
        source: 'background'
    };
    sendMessageToContent(message);
};

const sendDecorate = () => {
    const message: MessageType = {
        type: "TOGGLE_DECORATE",
        source: 'background'
    };
    sendMessageToContent(message);
};

const sendDisplay = () => {
    const message: MessageType = {
        type: "TOGGLE_DISPLAY",
        source: 'background'
    };
    sendMessageToContent(message);
};

const sendStatus = (display: boolean) => {
    const message: MessageType = {
        type: "DISPLAY_STATUS",
        display,
        source: 'background'
    };
    sendMessageToContent(message);
};



// todo - check which are unused
const handleMessage = (message: MessageType) => {
    log({ logType: 'MESSAGE_RECEIVED', functionName: 'N/A', payload: message });
    if (message.type === "REQ_DISPLAY_STATUS") {
        sendStatus(display);
    }
    if (message.type === "TOGGLE_DISPLAY") {
        sendDisplay();
    }
    if (message.type === "TOGGLE_DECORATE") {
        sendDecorate();
    }
    if (message.type === "TOGGLE_SETTING") {
        let setting = message.payload;
        sendSetting(setting);
    }

    if (message.type === "CHECK") {
        console.log('check received');
    }

    if (message.type === "AUTH_URI_REQUEST") {
        //
    }
};

subscribeToExtensionMessages(handleMessage);