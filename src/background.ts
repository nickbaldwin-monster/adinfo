// this is run as a background script (visible only by clicking inspect
// on the extension's background page (within chrome://extensions/)

// run as a separate instance in browser
// used to manage a browser wide state via messages

import { MessageType } from "./types/types";
import { logger } from "./helpers/logger";

const moduleName = 'background';
let log = logger(moduleName);
log({ logType: 'LOADED' });




// default state
let display = false;

const sendMessageToBackgroundAndPopup = (message:MessageType) => {
    chrome.runtime.sendMessage(message);
};

const sendMessageToContent = (message:MessageType) => {
    // todo - check this approach
    // todo - check url match - might need to provide array of diff monster domains
    // todo - add monsterboard
    // todo - add query e.g. {url: '*://*.monster.co.uk/*'}

    chrome.tabs.query({ active: true }, function(tabs){
        tabs.forEach((tab) => {
            if (tab.id) {
                chrome.tabs.sendMessage(tab.id, message);
            }
        });
    });

    /*

     chrome.tabs.query({url: ''}, function(tabs){
        tabs.forEach((tab) => {
            if (tab.id) {
                chrome.tabs.sendMessage(tab.id, message);
            }
        });
    })

    e.g. url is an array of host urls like: '*://*.monster.co.uk/*'

     */

    log({
        logType: 'MESSAGE_SENT',
        payload: message
    });
};



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
    const functionName = 'sendStatus';
    const message: MessageType = {
        type: "DISPLAY_STATUS",
        display,
        source: 'background'
    };

    // send message to popup
    // todo - needed?
    chrome.runtime.sendMessage(message);
    log({
        logType: 'MESSAGE_SENT',
        functionName,
        payload: message
    });

};


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
};





// #####
// ##### MAIN
// #####


// get initial state and notify popup and content scripts
// todo - test out having default settings applied here
// display = getSavedSettings();
// todo - or applying defaults and saving
// sendStatus(display);

// respond to messages
chrome.runtime.onMessage.addListener((message: MessageType) =>
    handleMessage(message)
);