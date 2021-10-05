import { defaultSettings } from "../types/Settings";

import { currentVersion, getDefaultUserSettings, isValidUserSettings, migrateFlatObject }
    from "../model/model";

const settingsKey = 'savedReduxState';
const storeKey = 'adinfo';




// todo use local storage
// todo in context
// window.localStorage.setItem("snowing", "true");
// chrome.storage.local.set({ display: display });


/*
    let savedSettings;
    chrome.storage.local.get(['adinfoSettings'], function(result) {
        savedSettings = result.key;
        console.log('savedSettings are: ', savedSettings);
    });
 */


export const getSavedSettings = () => {
    let store = loadStore();
    // v2.0.4 +

    if (!store || !store.version || store?.version === '2.0.3' || store?.version === '2.0.4') {
        let migratedStore = migrateFlatObject(store);
        if (isValidUserSettings(migratedStore)) {
            console.log('migrated saved settings to v' + currentVersion.version);
            return migratedStore;
        }
        else {
            console.log('could not migrate store. updated store to defaults for v' + currentVersion.version);
            return getDefaultUserSettings();
        }
    }
    if (store?.version && store.settings) {
        return store;
    }

    return null;
}











// todo interface of settings and store
const loadState = (key: string, storage: any) => {
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
            return undefined;
        }
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (err) {
        // todo log
        return undefined;
    }
};





// todo: interface for state
const saveState = (key: string, state: any, storage: string) => {
    try {
        const serializedState = JSON.stringify(state);
        if (storage === 'LOCAL') {
            localStorage.setItem(key, serializedState);
            // todo log
        }
        if (storage === 'SESSION') {
            sessionStorage.setItem(key, serializedState);
            // todo log
        }
        else {
            // todo log
        }
    } catch {
        // todo log
    }
};


export const loadStore = () => {
    return loadState(storeKey, 'LOCAL');
}

export const saveStore = (state: any) => {
    saveState(storeKey, state, 'LOCAL');
};











const getSavedSettingsOld = () => {
    let savedSettings;
    chrome.storage.local.get(['adinfoSettings'], function(result) {
        savedSettings = result.key;
        console.log('savedSettings are: ', savedSettings);
    });

    let local = window.localStorage.getItem('adinfo');
    let localSettings;
    if (local) {
        localSettings = JSON.parse(local);
    }
    console.log('local Settings are: ', localSettings);

    if (!localSettings?.version || localSettings.version !== '2.0.4') {
        return defaultSettings;
    }
    delete localSettings?.version;
    return localSettings || defaultSettings;
}

const saveSettingsOld = (settings: object) => {
    chrome.storage.local.set({ adinfoSettings: settings }, function() {
        // console.log('saved these settings', settings);
        // console.log('checking...');
        // chrome.storage.local.get(['adinfoSettings'], function(result) {
        //    console.log('savedSettings are: ', result.adinfoSettings);
        // });
    });

    // @ts-ignore
    let s = { ...settings, version };
    let string = JSON.stringify(s);
    window.localStorage.setItem('adinfo', string);
    let local = window.localStorage.getItem('adinfo');
    // console.log('local Settings are: ', local);
}


