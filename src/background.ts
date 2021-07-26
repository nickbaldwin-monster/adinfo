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


const sendSetting = (setting: string) => {
    const functionName = 'sendSetting';
    const message: MessageType = {type: "TOGGLE_SETTING", payload: setting, source: 'background'};

    // todo need to use url (match) in query?
    // https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/tabs/query
    chrome.tabs.query({active: true}, function (tabs) {
        tabs.forEach((tab) => {
            if (tab.id) {
                chrome.tabs.sendMessage(tab.id, message);
            }
        });
    });
    log({logType: 'MESSAGE_SENT', functionName, payload: message});
};


    const sendStatus = (display: boolean) => {
    const functionName = 'sendStatus';
    const message: MessageType = { type: "DISPLAY_STATUS", display, source: 'background' };

    // send message to popup
    // todo - needed?
    chrome.runtime.sendMessage(message);
    log({ logType: 'MESSAGE_SENT', functionName, payload: message});

    // todo - check url match - might need to provide array of diff monster domains
    // todo - add monsterboard
    // todo - add query e.g. {url: '*://*.monster.co.uk/*'}


    /*
    chrome.tabs.query({url: '*://*.monster.co.uk/*'}, (tabs) => {
        tabs.forEach((tab) => {
            if (tab.id) {
                chrome.tabs.sendMessage(tab.id, message);
            }
        });
        */



        // todo - send only to monster tabs?
        // todo - register tabs?
        // todo - unload tabs?


    // todo - check this approach

        chrome.tabs.query({active: true}, function(tabs){
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
    if (message.type === "TOGGLE_SETTING") {
        let setting = message.payload;
        // todo use local storage
        // window.localStorage.setItem("snowing", "true");
        // chrome.storage.local.set({ display: display });

        sendSetting(setting);

    }
};





// #####
// ##### MAIN
// #####

const moduleName = 'background';
let log = logger(moduleName);
log({ logType: 'LOADED' });

// get initial state and notify popup and content scripts
// todo - test out having default settings applied here
display = getSavedSettings();
// todo - or applying defaults and saving
sendStatus(display);

// respond to messages
chrome.runtime.onMessage.addListener((message: MessageType) =>
    handleMessage(message)
);