import React, { createContext, useContext, useState, useEffect, useReducer } from "react";
import { logger } from "../helpers/logger";
import { transformJobs } from "../helpers/transformJobs";
import { transformRequest } from "../helpers/transformRequest";
import { MessageType } from "../types";
import { Settings, isSettings, isSetting, defaultSettings } from '../types/Settings';
import { decorateResults } from '../helpers/decorateResults';

const moduleName = 'Context';
let log = logger(moduleName);
log({ logType: 'LOADED' });


const ReduxContext = createContext({});
const { Provider, Consumer } = ReduxContext;


// todo: may want to use a reducer for certain state  e.g. adding nodes to list -
//  may also remove need to deal with re-renders if add elements to state rather than recreating...






interface DisplayJobProperty {
    [key: string]: boolean;
}

function settingsReducer(state: object, action: object): object {
    return {};
}




// @ts-ignore
const ReduxProvider = ({ children }) => {

    const [settings, setSettings] = useState(defaultSettings);
    const [numberResults, setNumberResults] = useState(0);
    const [results, setResults] = useState(true);
    const [mobileResults, setMobileResults] = useState(true);
    const [display, setDisplay] = useState(true);
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [request, setRequest] = useState([]);
    const [redux, setRedux] = useState({});

    log({logType: 'INFO', message: 'ReduxProvider mounted' });


    const updateSettings = (settingName: string) => {
        /*
            message: {
                type: "TOGGLE_SETTING"
                payload: "title"
                source?: "background" // ?
            }
        */

        if (settings && isSetting(settingName)) {

            setSettings((settings: Settings) => {

                // @ts-ignore
                let prevSettingValue = settings[settingName];
                let nextSetting = {[settingName]: !prevSettingValue};

                log({logType: 'INFO', message: 'new state in reducer', payload: {...settings, ...nextSetting}});
                // @ts-ignore
                let newSettings = {...settings, [settingName]: !settings[settingName]};
                if (isSettings(newSettings)) {
                    return newSettings;
                }
                else {
                    // @ts-ignore
                    log({logType: 'ERROR', message: 'unable to update Settings', payload: {[settingName]: !settings[settingName]}});
                    return settings;
                }
            });
        }
    }

    const updateJobsAndRequest = (jsonString: string) => {

        /*
            message: {
                type: "JOB_STATE"
                payload: "" // stringified json
                source?: "background"
            }
        */
        let json;
        try {
            json = JSON.parse(jsonString);
        }
        catch (e) {
            log({
                logType: 'ERROR',
                message: 'Could not parse state from localStorage',
                payload: { state: jsonString }
            });
        }

        if (json) {

            // todo - prep for refactor
            // split up updates, pass less data around
            const {
                country,
                language,
                domain,
                locale,
                appVersion,
                clientIP,
                jobsList,
                searchRequest
            } = json

            const {
                searchId,
                gctsReqId,
                totalSize,
                estimatedTotalSize
            } = jobsList;



            let transformedJobs = transformJobs(jobsList);
            // @ts-ignore
            setJobs(transformedJobs);


            let transformedRequest = transformRequest(json);
            if (transformedRequest) {
                let arr = [];
                for (const [k, v] of Object.entries(transformedRequest)) {
                    arr.push({key: k, value: v});
                }
                // @ts-ignore
                setRequest(arr);
            }

            setRedux(json);

            setLoading(false);

            log({
                logType: 'INFO',
                message: 'Context - useEffect: state is updated:  ReduxProvider updated',
                payload: { jobs, loading, redux, request }
            });
        }
    }

    const handleMessage = (message: MessageType) => {

        log({ logType: 'MESSAGE_RECEIVED', functionName: 'handleMessage', payload: message });

        if (message.type === "DISPLAY_STATUS") {
            // updateDisplay(message.display);
        }
        if (message.type === "SETTINGS_STATUS") {
            // todo - apply settings
        }

        // @ts-ignore    // checking property name is valid
        // todo - move this into handler
        if (message.type === "TOGGLE_SETTING" && defaultSettings[message.payload] !== 'undefined') {
            updateSettings(message.payload);
        }

        if (message.type === 'JOB_STATE') {
            updateJobsAndRequest(message.payload);
        }

        if (message.type === 'RESULTS_UPDATED') {
            // todo - cannot receive dom elements - so instead, just need to respond to x new elements
            console.log('RESULTS_UPDATED');
            console.log(message);
            decorateResults(message.payload);
        }

    };


    useEffect(() => {

        // todo - read hooks doc - will adding dependencies here remove unnecessary re-renders?!?!?!

        // todo - should we do dom manipulation here?!??!?!?!
        let something = document.querySelector('.ds-header');
        if (something && !something.hasAttribute('data-something')) {
            something.setAttribute('data-something', 'yes');
        }
        else {
            console.log('failed');
            console.log(something);

        }


        // todo - need to detach this? does listener get added every render?

        chrome.runtime.onMessage.addListener((message: MessageType) => {
            handleMessage(message);
        });
        window.addEventListener("message", function (e) {
            if (e.data?.type) {
                handleMessage(e.data);
            }
        });

    }, []);

    return (
        <Provider value={{
            display, setDisplay,
            jobs, setJobs,
            request,
            redux,
            loading,
            settings
        }} >
            {children}
        </Provider>
    );
};

const useReduxContext = () => {
    const state = useContext(ReduxContext);
    if (state === undefined) {
        throw new Error("adInfo: useReduxContext must be called within ReduxProvider");
    }

    log({logType: 'INFO', message: 'Context used', payload: state });

    return {
        ...state
    };
};

export { ReduxProvider, Consumer as ReduxConsumer, useReduxContext };

export default ReduxContext;