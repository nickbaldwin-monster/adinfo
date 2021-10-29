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
import { getDefaultUserSettings } from "./model/UserSettings";

import { PublicClientApplication } from "@azure/msal-browser";
import { msalConfig } from "./auth/authConfig";

// @ts-ignore
const instance = new PublicClientApplication(msalConfig);

import { loginRequest } from "./auth/authConfig";

// @ts-ignore




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
        console.log('getLoginUrl promise');
        // @ts-ignore
        instance.loginRedirect({
            ...request,
            onRedirectNavigate: (url: any) => {
                console.log('onRedirectNavigate url:', url);
                resolve(url);
                return false;
            }
        }).catch(reject);
    });
}


async function getLogoutUrl(request: any) {
    return new Promise((resolve, reject) => {
        console.log('getLogoutUrl promise');
        // @ts-ignore
        instance.logout({
            ...request,
            onRedirectNavigate: (url: any) => {
                console.log('onRedirectNavigate url:', url);
                // looks like https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=9deaf42c-a982-41a0-95bf-5d95fa66eb34&scope=openid%20profile%20offline_access&redirect_uri=https%3A%2F%2Fnnimmgedomeeljdbgghchnbgncnggdcc.chromiumapp.org%2F&client-request-id=e507ad5d-7561-4bc3-9059-2447033f33a2&response_mode=fragment&response_type=code&x-client-SKU=msal.js.browser&x-client-VER=2.16.1&x-client-OS=&x-client-CPU=&client_info=1&code_challenge=qjCn6OQ_rpcsENlJPHgxEDBYTD31IeufY3v1AA-V4e8&code_challenge_method=S256&nonce=d756423e-c16a-4bb2-9760-ca538efd3512&state=eyJpZCI6IjdiMmFkMGVhLWQxZDMtNDI3Ny1hYmE5LWZlYTRkNTgwM2Y1MCIsIm1ldGEiOnsiaW50ZXJhY3Rpb25UeXBlIjoicmVkaXJlY3QifX0%3D
                resolve(url);
                return false;
            }
        }).catch(reject);
    });
}

async function launchWebAuthFlow(url: string) {
    return new Promise((resolve, reject) => {
        console.log('launchWebAuthFlow promise');
        chrome.identity.launchWebAuthFlow({
            interactive: true,
            url
        }, (responseUrl) => {
            // Response urls includes a hash (login, acquire token calls)
            // @ts-ignore
            if (responseUrl.includes("#")) {

                // looks something like https://nnimmgedomeeljdbgghchnbgncnggdcc.chromiumapp.org/#code=0.AUEAG1QpHXg-C0eHqN0xjPrv5yz06p2CqaBBlb9dlfpm6zQAAAA.AQABAAIAAAD--DLA3VO7QrddgJg7WevrejOcVrnyE-2__lCorKjFdfG-XD7Z-h2Y3LnpMwJUwxJHpMY3iAku031o5yBQqT536g2CTVMc4tWqFc2gBAVpqX4-x8IwJlkl8_93OLGUhIZyZmqJmaRZNx-Yj96-yfxKlLaGA6IT_e37g8iia9HpPgKh9iX57l4wXtrTHtdEagkaZYvhkN4c_or94_kDxInRsYt_Hdq9m_6FFJLsgld5TVJHmyJnCjAj6AzayvUbOjm63jpDH4eTfIjB1vFR_XjVQ_QFvqgzxNJ33Fhbc8JK2e0UyRO2Enlgbu90BkoexcqeR7wL_WRtqGHaLRhSgfS7r2oxIGRQBIsWnmUwo8fvfkPJXtt9SbpIRFnqsAv0sX2IjyRN25rc7hijtpgCYCiDmw3zlw4l2VcdkplVQA-n7fYJSugtAY_TTfWSBIZnu54Rn7Ygnu1qvPsodAOYhn1Y3NpUnZk8fMw6usV5YMDFIs2nkVSa4YMLHyTUBjY2ir3sa6FcG8h0ZtzqVxpDyIwPpHgfY5dLNnXJxJlyqO8mMqmLLlhMWVYgsgzkmhIKq5p_CxXMQ95MNHObdg0b1YLLHcHeiqrrJcM6y72iVWoAATTexmFHE7vp1xnYam2_1leNYHcw5LkaYm8slw6sqljWcV34V4iWlNgs7e59beIyP5LloezAezPeiU1FnErvFkwKkhJiiBu49JLGbH9nSWQJD0bTd8w6cnJmUulFgy7oS6rsYUwrmqmZlCsLUZO_F5HN3MEC_zfkzfWbKKWc725OIAA&client_info=eyJ1aWQiOiI3NzZkMDMxOC1kMDIzLTQ5YzUtYTc3Yy05OWQ4MmNjMzc0NDUiLCJ1dGlkIjoiMWQyOTU0MWItM2U3OC00NzBiLTg3YTgtZGQzMThjZmFlZmU3In0&state=eyJpZCI6IjdiMmFkMGVhLWQxZDMtNDI3Ny1hYmE5LWZlYTRkNTgwM2Y1MCIsIm1ldGEiOnsiaW50ZXJhY3Rpb25UeXBlIjoicmVkaXJlY3QifX0%3d&session_state=ce37c837-fba3-4e0e-bace-dee505ee42f6

                // todo
                console.log('responseUrl includes #', responseUrl);

                // @ts-ignore
                instance.handleRedirectPromise(`#${responseUrl.split("#")[1]}`)
                    .then(resolve)
                    .catch(reject)
            } else {
                // Logout calls
                resolve();
            }
        })
    })
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

