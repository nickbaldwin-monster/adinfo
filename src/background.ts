// this is run as a background script (visible only by clicking inspect
// on the extension's background page (within chrome://extensions/)

// run as a separate instance in browser
// used to manage a browser wide state via messages

import { MessageType } from "./types";
import { logger } from "./helpers/logger";

// default state
let display = false;



// todo - load state from local storage
const getSavedSettings = () => {
    let display = false;
    if (chrome.storage.local) {
        chrome.storage.local.get("display", (res) => {
            if (res["display"]) {
                display = true;
            } else {
                display = false;
            }
        });
    }
    return display;
};


const sendStatus = (display: boolean) => {
    const functionName = 'sendStatus';
    const message: MessageType = { type: "DISPLAY_STATUS", display, source: 'background' };

    // send message to popup
    chrome.runtime.sendMessage(message);
    log({ logType: 'MESSAGE_SENT', functionName, payload: message});

    // send message to every active tab - not ideal!
    chrome.tabs.query({}, (tabs) => {
        tabs.forEach((tab) => {
            if (tab.id) {
                chrome.tabs.sendMessage(tab.id, message);
            }
        });

        // todo - send only to monster tabs?
        // todo - register tabs?
        // todo - unload tabs?
    });

    // todo - check this approach
    /*
        chrome.tabs.query({active: true}, function(tabs){
            tabs.forEach((tab) => {
                if (tab.id) {
                    chrome.tabs.sendMessage(tab.id, message);
                }
            });
        })

         */
};


const handleMessage = (message: MessageType) => {
    log({ logType: 'MESSAGE_RECEIVED', functionName: 'N/A', payload: message });
    if (message.type === "REQ_DISPLAY_STATUS") {
        sendStatus(display);
    }
    if (message.type === "TOGGLE_DISPLAY") {
        display = message.display;

        // todo use local storage
        // window.localStorage.setItem("snowing", "true");
        chrome.storage.local.set({ display: display });

        sendStatus(display);
    }
};





// #####
// ##### MAIN
// #####

const moduleName = 'background';
let log = logger(moduleName);
log({ logType: 'LOADED' });

// get initial state and notify popup and content scripts
display = getSavedSettings();
sendStatus(display);

// respond to messages
chrome.runtime.onMessage.addListener((message: MessageType) =>
    handleMessage(message)
);