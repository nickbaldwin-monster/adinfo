import {
    currentVersion,
    getDefaultUserSettings,
    isValidDataSetting,
    isValidUserSettings,
    migrateFlatObject,
    UserSettings
}
    from "../model/dataModel";

const storeKey = 'adinfo';

const defaultSettings = getDefaultUserSettings();


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
            savedSettings = defaultSettings;
            saveExtensionSettings(defaultSettings);
            return defaultSettings;
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





export const getSavedSettings = () => {

    console.log('current plugin version is: ', currentVersion.version);
    let store = loadStore();

    if (!store ) {
        console.log('youdo not have any saved settings - using default settings');
        store = getDefaultUserSettings();

    }

    else if (!store.version || store?.version === '2.0.3' || store?.version === '2.0.4') {
        console.log('your saved settings are for version ' +  store?.version || 'unknown');

        let migratedStore = migrateFlatObject(store);
        if (isValidUserSettings(migratedStore)) {
            console.log('your saved settings have been migrated to version ' + currentVersion.version);
            store = migratedStore;
        }
        else {
            console.log('your saved settings could not be migrated. updated settings to defaults for version ' + currentVersion.version);
            store = getDefaultUserSettings();
        }

    }

    else if (store?.version === '2.0.5') {
        console.log('your saved settings are for version ' + store?.version + ". Updated settings to defaults for version " + currentVersion.version);
        store = getDefaultUserSettings();
    }

    else if (!isValidUserSettings(store)) {
        console.log('your saved settings could nare invalid. updated settings to defaults for version ' + currentVersion.version);
        store = getDefaultUserSettings();
    }

    saveStore(store);
    return store;
}


export const getDecorateSetting = () => {
    let store = loadStore();
    if (store && store.featureSettings) {
        return store.featureSettings.decorateResults?.enabled;
    }
    else {
        return true;
    }
}

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


export const getObjectFromLocalStorage = async () => {
    return new Promise((resolve, reject) => {
        try {
            chrome.storage.local.get([storeKey], function(value) {
                if (value[storeKey] === undefined) {
                    // todo - save default settings
                    reject();
                } else {
                    resolve(value[storeKey]);
                }
            });
        } catch (ex) {
            console.log('err - caught');
            reject(ex);
        }
    });
};


const saveObjectInLocalStorage = async (obj: object) => {
    return new Promise((resolve, reject) => {
        try {
            chrome.storage.local.set(obj, function() {
                resolve();
            });
        } catch (ex) {
            reject(ex);
        }
    });
};


const removeObjectFromLocalStorage = async () => {
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

