import React, { createContext, useContext, useState, useEffect, useReducer } from "react";
import { logger } from "../helpers/logger";
import { transformJobs } from "../helpers/transformJobs";
import { transformRequest } from "../helpers/transformRequest";
import { MessageType } from "../types";
import { Settings, isSettings, isSetting, defaultSettings } from '../types/Settings';
import {decorateResults, removeDecorations} from '../helpers/decorateResults';

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
    const [decorate, setDecorate] = useState(true);
    const [display, setDisplay] = useState(true);
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [request, setRequest] = useState([]);
    const [redux, setRedux] = useState({});

    log({
        logType: 'INFO',
        message: 'ReduxProvider mounted'
    });


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

    const updateDisplay = () => {
        /*
            message: {
                type: "TOGGLE_DISPLAY"
                source?: "background" // ?
            }
        */
        setDisplay((display: boolean) => {
            log({
                logType: 'INFO',
                message: 'new display state in reducer',
                payload: { display: !display }
            });
            return !display;
        });
    }




    /* useref pattern


    const [myState, _setMyState] = useState(0);
    const myStateRef = React.useRef(myState);
    const setMyState = data => {
        myStateRef.current = data;
        _setMyState(data);
    };

     */

    const myStateRef = React.useRef(decorate);
    const updateDecorate = () => {
        /*
            message: {
                type: "TOGGLE_DECORATE"
                source?: "background" // ?
            }
        */
        setDecorate((decorate: boolean) => {
            log({
                logType: 'INFO',
                message: 'new decorate state in reducer',
                payload: { decorate: !decorate }
            });
            myStateRef.current = !decorate;
            return !decorate;
        });
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
            setNumberResults(transformedJobs.length);

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


            // todo - hack? - can this be moved into useEffect now that there is a ref???
            if (myStateRef.current) {
                decorateResults(transformedJobs);
            }
            else {
                removeDecorations();
            }
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
        if (message.type === "TOGGLE_DISPLAY") {
            updateDisplay();
        }
        if (message.type === "TOGGLE_DECORATE") {
            updateDecorate();
        }

        // @ts-ignore    // checking property name is valid
        // todo - move this into handler
        if (message.type === "TOGGLE_SETTING" && defaultSettings[message.payload] !== 'undefined') {
            updateSettings(message.payload);
        }

        if (message.type === 'JOB_STATE') {
            updateJobsAndRequest(message.payload);

            // todo - may need to ensure that results are handled too

        }

        if (message.type === 'RESULTS_UPDATED') {

            // todo - cannot receive dom elements - so instead, just need to respond to x new elements

            // decorateResults(message.payload);
            log({logType: 'INFO', message: message.type, payload: message})
        }

    };



    useEffect(() => {

        // todo - read hooks doc - will adding dependencies here remove unnecessary re-renders?!?!?!
        // todo - need to detach this? does listener get added every render?

        chrome.runtime.onMessage.addListener((message: MessageType) => {
            handleMessage(message);
        });


        // todo - augmenting message with jobs
        window.addEventListener("message", function (e) {
            if (e.data?.type) {
                let message = {...e.data, jobs };
                handleMessage(message);
            }
        });

    }, []);


    return (
        <Provider value={{
            display, setDisplay,
            decorate,
            jobs, setJobs,
            request,
            redux,
            loading,
            settings,
            numberResults
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