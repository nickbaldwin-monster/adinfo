

const settingsKey = 'savedReduxState';
const storeKey = 'adinfo_settings';

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

export const loadStore = () => {
    return loadState(storeKey, 'LOCAL');
}

export const loadSettings = () => {
    return loadState(settingsKey, 'SESSION');
}

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

export const saveSettings = (state: any) => {
    saveState(settingsKey, state, 'SESSION');
};


// console.log(window.sessionStorage.getItem("savedReduxState"));