import { currentVersion, getDefaultUserSettings, isValidUserSettings, migrateFlatObject }
    from "../model/dataModel";

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