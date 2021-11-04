import { currentVersion } from "../model/DataModel";
import { isValidUserSettings, defaultUserSettings, UserSettings } from "../model/UserSettings";

const storeKey = 'adinfo';


// todo interface of settings and store
const loadFromStorage = (key: string, storage: any = 'LOCAL') => {
    try {
        let serializedState;
        if (storage === 'SESSION') {
            serializedState = sessionStorage.getItem(key);
        }
        else if (storage === 'LOCAL') {
            serializedState = localStorage.getItem(key);
        }
        else {
            // log
            console.log('error serializing store')
            return undefined;
        }
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (err) {
        console.log('error loading store')
        return undefined;
    }
};





// todo: interface for state
const saveToStorage = (key: string, state: any, storage: string = 'LOCAL') => {
    try {
        const serializedState = JSON.stringify(state);
        if (storage === 'LOCAL') {
            localStorage.setItem(key, serializedState);
        }
        else if (storage === 'SESSION') {
            sessionStorage.setItem(key, serializedState);
        }
        else {
            console.log('else what?!');
        }
    } catch {
        // todo
        console.log('error serializing or saving')
    }
};


export const loadStore = () => {
    return loadFromStorage(storeKey, 'LOCAL');
}

export const saveStore = (state: any) => {
    saveToStorage(storeKey, state, 'LOCAL');
};











// @ts-ignore
export const getSavedExtensionSettings = () => {
    let savedSettings;
    chrome.storage.local.get([storeKey], function(result) {
        savedSettings = result[storeKey];
        console.log('savedSettings are: ', savedSettings);
        if (!savedSettings) {
            console.log('no saved settings. going to use and save default settings: ', savedSettings);
            savedSettings = defaultUserSettings;
            saveExtensionSettings(defaultUserSettings);
            return defaultUserSettings;
        }
        return savedSettings;
    });
}








export const saveExtensionSettings = (settings: object) => {
    chrome.storage.local.set({ [storeKey]: settings }, function() {
        console.log('saving these settings', settings);

        chrome.storage.local.get([storeKey], function(result) {
            console.log('savedSettings is: ', result[storeKey]);
        });
    });
}


const needToMigrate = {
    "2.0.0" : true,
    "2.0.1" : true,
    "2.0.2" : true,
    "2.0.3" : true,
    "2.0.4" : true,
    "2.0.5" : true,
    "2.1.0" : true,
    "2.2.0" : true,
}


export const getSavedSettings = () => {

    console.log('current plugin version is: ', currentVersion.version);
    let store = loadStore();

    if (!store || !store.version ) {
        console.log('you do not have any saved settings - using default settings');
        store = defaultUserSettings;

    }
    // @ts-ignore
    else if (needToMigrate[store.version]) {
        console.log('your saved settings are for version ' +  store?.version || 'unknown');
        console.log('updated settings to defaults for version ' + currentVersion.version);
        store = defaultUserSettings;
    }

    else if (!isValidUserSettings(store)) {
        console.log('your saved settings are invalid. updated settings to defaults for version ' + currentVersion.version);
        store = defaultUserSettings
    }

    saveStore(store);
    return store;
}

// todo - remove
export const getDecorateSetting = () => {
    let store = loadStore();
    if (store && store.featureSettings) {
        return store.featureSettings.decorateResults?.enabled;
    }
    else {
        return true;
    }
}
// todo - remove
export const getDisplayDevInfoSetting = () => {
    let store = loadStore();
    if (store && store.featureSettings) {
        return store.featureSettings.displayDevInfo?.enabled;
    }
    else {
        return false;
    }
}


export const saveSettings = (store: object) => {
    saveStore(store);
}













// todo - WIP

interface Store {
    [key: string]: UserSettings;
}

export const getSettingsFromExtensionStorage = async () => {
    return new Promise((resolve, reject) => {
        try {
            chrome.storage.local.get([storeKey], function(value: Store ) {
                if (!value || value[storeKey] === undefined) {
                    // todo - save default settings
                    reject();
                } else {
                    resolve(value[storeKey]);
                }
            });
        } catch (err) {
            console.log('err - caught');
            reject(err);
        }
    });
};


// todo - use settings type
export const saveSettingsToExtensionStorage = async (settings: object) => {
    return new Promise((resolve, reject) => {
        try {
            chrome.storage.local.set({[storeKey]: settings}, function() {
                resolve();
            });
        } catch (ex) {
            reject(ex);
        }
    });
};


export const removeObjectFromLocalStorage = async () => {
    return new Promise((resolve, reject) => {
        try {
            chrome.storage.local.remove([storeKey], function() {
                resolve();
            });
        } catch (ex) {
            reject(ex);
        }
    });
};

