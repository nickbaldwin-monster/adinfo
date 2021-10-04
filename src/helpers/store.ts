import { defaultSettings } from "../types/Settings";

import { migrateFlatObject } from "../model/job";

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
    if (store?.version && store.settings) {
        return store;
    }
    if (store?.version === '2.0.3' || store?.version === '2.0.4') {
        return migrateFlatObject(store);
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









