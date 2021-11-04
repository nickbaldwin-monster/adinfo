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
    getSettingsFromExtensionStorage,
    saveSettingsToExtensionStorage,
    getSavedExtensionSettings,

    saveExtensionSettings
} from './helpers/store';
import {DisplaySetting, getDefaultUserSettings, UserSettings} from "./model/UserSettings";

import { PublicClientApplication } from "@azure/msal-browser";
import { msalConfig } from "./auth/authConfig";

// @ts-ignore
const instance = new PublicClientApplication(msalConfig);

import { loginRequest } from "./auth/authConfig";
import {currentVersion} from "./model/DataModel";

// @ts-ignore




const moduleName = 'background';
let log = logger(moduleName);
log({ logType: 'LOADED' });


let settings = getDefaultUserSettings();
let loading = true;
let error = false;

getSettingsFromExtensionStorage().then((savedSettings: any) => {
    console.log('default settings: ', settings);
    console.log('settings in chrome extension storage: ', savedSettings);
    console.log('retrieved at: ', Date.now());
    // @ts-ignore
    if (savedSettings?.version === 'currentVersion.version') {
        settings = savedSettings;
        // todo - send message to note in ui
    }
    else {
        saveSettingsToExtensionStorage(settings).then(() => {
            console.log('saved default settings into extension storage');
        }).catch((err: any) => {
            console.log('error saving default settings into extension storage', err);
            // todo - send message to note error in ui
            error = true;
        });
    }
    loading = false;

    // todo - send message with retrieved state...

}).catch(err => {
    console.log('err: ', err);
    error = true;

    // todo - send message with error...
})




// default state
let display = false;
let auth = false;
let lastCheckTime = 0;
let period = 172800000;


const isAuthCurrent = () => {
    let cutoff = Date.now() - period;
    return auth && lastCheckTime > cutoff;
}


const sendSettings = () => {
    // todo - when error
    // todo - poll in case still loading?
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

const sendDisplaySetting = (value: string) => {
    const message: MessageType = {
        type: "TOGGLE_DISPLAY_SETTING",
        payload: value,
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
    if (message.type === "TOGGLE_DISPLAY_SETTING") {
        let setting = message.payload;
        sendDisplaySetting(setting);
    }



    if (message.type === "CHECK") {
       // console.log('check received');
    }


    // on initial load of content
    if (message.type === "LOGIN_STATUS_REQUEST") {
        console.log("LOGIN_STATUS_REQUEST", auth);
        // todo - handle in context
        sendMessageToContent({
            type: "LOGIN_STATUS_RESPONSE",
            payload: auth,
            source: "background"
        });
        // todo - ??
        // auth = isLoggedIn();
    }
    if (message.type === "LOGIN_REQUEST") {
        let check = isLoggedIn();
        if (!check) {
            handleLogin();
        }
        // todo
    }
    if (message.type === "LOGOUT_REQUEST") {
        let check = isLoggedIn();
        if (check) {
            handleLogout();
        }
        // todo
    }

    if (message.type === "VERSION_REQUEST") {
        sendMessageToContent({
            type: "VERSION_RESPONSE",
            source: "background",
            payload:  version
        });
    }





};

subscribeToExtensionMessages(handleMessage);







const check = () => {
        // @ts-ignore
        let accounts = instance.getAllAccounts();
        if (accounts.length) {
            console.log('already logged in');
            return accounts;
        }
        return null;
}

const getAccounts = () => {
    // @ts-ignore
    return instance.getAllAccounts();
}

const getFirstAccount = () => {
    // @ts-ignore
    return instance.getAllAccounts()[0];
}

const isLoggedIn = () => {
    // @ts-ignore
    let accounts = instance.getAllAccounts();
    return !!accounts.length;
}



async function getLoginUrl(request: any, reject: any) {
    return new Promise((resolve) => {
        // @ts-ignore
        instance.loginRedirect({
            ...request,
            onRedirectNavigate: (url: any) => {
                resolve(url);
                return false;
            }
        }).catch(reject);
    });
}


async function getLogoutUrl(request: any) {
    return new Promise((resolve, reject) => {
        // @ts-ignore
        instance.logout({
            ...request,
            onRedirectNavigate: (url: any) => {
                resolve(url);
                return false;
            }
        }).catch(reject);
    });
}

async function launchWebAuthFlow(url: string) {
    return new Promise((resolve, reject) => {
        chrome.identity.launchWebAuthFlow({
            interactive: true,
            url
        }, (responseUrl) => {
            // Response urls includes a hash (login, acquire token calls)
            // @ts-ignore
            if (responseUrl.includes("#")) {
                // @ts-ignore
                instance.handleRedirectPromise(`#${responseUrl.split("#")[1]}`)
                    .then(resolve)
                    .catch(reject)
            }
            else {
                // Logout calls
                resolve();
            }
        });
    });
}


const login = async () => {
    // @ts-ignore
    const url = await getLoginUrl();
    // @ts-ignore
    const result = await launchWebAuthFlow(url);
    // returns account object
    return result;
};

const logout = async () => {
    // @ts-ignore
    const logoutUrl = await getLogoutUrl();
    // @ts-ignore
    await launchWebAuthFlow(logoutUrl);
};


const handleLogin = () => {
    console.log('handle login');

    let completed: MessageType = {
        type: 'LOGIN_RESPONSE',
        source: 'popup',
        payload: true
    };
    login().then(res => {
        // returns object - see account.json
        auth = true;

        sendMessageToContent(completed);

        // todo - pass name
        // @ts-ignore
        console.log(res?.account?.name);
        return res; // see account object in sampleData dir
    });
};

const handleLogout = () => {
    console.log('handle logout');
    // for new background approach
    let newMessage: MessageType = {
        type: 'LOGOUT_RESPONSE',
        source: 'popup',
        payload: false,
    };
    logout().then(res => {
        auth = false;
        sendMessageToContent(newMessage);
        return res; // if completed, will be undefined
    });
};


// todo - remove later
// @ts-ignore
window["adinfo"] = {
    instance,
    login,
    logout,
    check,
    getAccounts,
    getFirstAccount,
    isLoggedIn,
}

auth = isLoggedIn();

let version = chrome.runtime.getManifest()?.version;
console.log("VERSION", version);

