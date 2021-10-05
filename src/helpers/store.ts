import { currentVersion, getDefaultUserSettings, isValidUserSettings, migrateFlatObject }
    from "../model/model";

const settingsKey = 'savedReduxState';
const storeKey = 'adinfo';

const defaultSettings = getDefaultUserSettings();


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











// todo interface of settings and store
const loadState = (key: string, storage: any = 'LOCAL') => {
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
        // todo log
        console.log('error loading store')
        return undefined;
    }
};





// todo: interface for state
const saveState = (key: string, state: any, storage: string = 'LOCAL') => {
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





export const getSavedSettings = () => {

    console.log('current plugin version is: ', currentVersion.version);
    let store = loadStore();

    if (!store || !store.version || store?.version === '2.0.3' || store?.version === '2.0.4') {
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

    if (store?.version && store.settings) {
        saveStore(store);
        return store;
    }

    return null;
}



export const saveSettings = (store: object) => {
    saveStore(store);
}