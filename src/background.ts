// this is run as a background script (visible only by clicking inspect
// on the extension's background page (within chrome://extensions/)

// run as a separate instance in browser
// used to manage a browser wide state via messages

import { MessageType } from "./types/types";
import { logger } from "./helpers/logger";

import { subscribeToExtensionMessages, subscribeToWindowMessages,
    sendMessageToBackgroundAndPopup, sendMessageToContent
} from "./helpers/messaging";


import {
    getObjectFromLocalStorage,
    getSavedExtensionSettings,

    saveExtensionSettings
} from './helpers/store';
import { getDefaultUserSettings } from "./model/dataModel";
const moduleName = 'background';
let log = logger(moduleName);
log({ logType: 'LOADED' });


let settings = getDefaultUserSettings();
let loading = true;
let error = false;

getObjectFromLocalStorage().then( savedSettings => {
    console.log('default settings: ', settings);
    console.log('settings in chrome extension storage: ', savedSettings);
    console.log('retrieved at: ', Date.now());
    // @ts-ignore
    settings = savedSettings;
    loading = false;
    // todo - save
}).catch(err => {
    console.log('err: ', err);
    error = true;
})


// default state
let display = false;
let auth = false;
let lastCheckTime = 0;
let started = false;
let period = 172800000;


const isAuthCurrent = () => {
    let cutoff = Date.now() - period;
    return auth && lastCheckTime > cutoff;
}


// todo - WIP
const sendSettings = () => {
    // todo - when error
    if (!loading) {
        let message: MessageType = {
            type: "SAVED_SETTINGS_RESPONSE",
            payload: settings,
            source: 'background'
        };
        sendMessageToContent(message);
    }
    else {
        let message : MessageType = {
            type: "SETTINGS_NOT_READY",
            source: 'background'
        };
        sendMessageToContent(message);
    }

};

const sendDataSetting = (setting: string) => {
    const message: MessageType = {
        type: "TOGGLE_SETTING",
        payload: setting,
        source: 'background'
    };
    sendMessageToContent(message);
};

interface FeatureSetting  {
    settingName: string;
    property: string;
}
const sendFeatureSetting = (props: FeatureSetting) => {
    const message: MessageType = {
        type: "TOGGLE_FEATURE_SETTING",
        payload: props,
        source: 'background'
    };
    sendMessageToContent(message);
};


const sendDecorate = () => {
    const message: MessageType = {
        type: "TOGGLE_DECORATE",
        source: 'background',
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

    // todo - WIP
    // for tabs created after extension already active
    if (message.type === "SAVED_SETTINGS_REQUEST") {
        sendSettings();
    }

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
        sendDataSetting(setting);
    }

    if (message.type === "TOGGLE_FEATURE_SETTING") {
        let setting = message.payload;
        sendFeatureSetting(setting);
    }



    if (message.type === "CHECK") {
       // console.log('check received');
    }


    if (message.type === "LOGIN_STARTED") {
        started = true;
        //console.log('LOGIN_STARTED');
        //console.log('auth: ', auth);
        //console.log('started: ', started);
    }

    if (message.type === "AUTH_FLOW_STATUS_REQUEST") {
        //console.log('AUTH_FLOW_STATUS_REQUEST');
        //console.log('auth: ', auth);
        //console.log('started: ', started);
        sendMessageToBackgroundAndPopup({type: 'AUTH_FLOW_STATUS_RESPONSE', source: 'background', payload: started});
    }

    if (message.type === "AUTH_STATUS_REQUEST") {
       // console.log('AUTH_STATUS_REQUEST');
        //console.log('auth: ', auth);
        //console.log('started: ', started);
        let status = isAuthCurrent();
        sendMessageToContent({type: 'AUTH_STATUS_RESPONSE', source: 'background', payload: status});
    }

    if (message.type === "LOGIN_COMPLETED") {
        auth = true;
        started = false;
        lastCheckTime = message.payload;
        //console.log('LOGIN COMPLETED');
        //console.log('auth: ', auth);
        //console.log('started: ', started);
        sendMessageToContent({type: 'AUTH_STATUS_RESPONSE', source: 'background', payload: auth});

    }

    if (message.type === "LOGIN_CHECKED") {
        auth = true;
        lastCheckTime = message.payload;
        //console.log('LOGIN_CHECKED');
        //console.log('auth: ', auth);
        //console.log('started: ', started);
        sendMessageToContent({type: 'AUTH_STATUS_RESPONSE', source: 'background', payload: auth});

    }

    if (message.type === "LOGOUT") {
        auth = false;
        //console.log('LOGOUT');
        //console.log(auth);
    }

    if (message.type === "AUTH_URI_REQUEST") {
        //console.log('AUTH_URI_REQUEST');
        //console.log(auth);
    }


};

subscribeToExtensionMessages(handleMessage);
