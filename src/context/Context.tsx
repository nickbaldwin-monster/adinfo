import React, { createContext, useContext, useState, useEffect, useReducer } from "react";
import { logger } from "../helpers/logger";
import { transformJobs } from "../helpers/transformJobs";
import { transformRequest } from "../helpers/transformRequest";
import {MessageType} from "../types";



const moduleName = 'Context';
let log = logger(moduleName);
log({ logType: 'LOADED' });


const ReduxContext = createContext({});
const { Provider, Consumer } = ReduxContext;


// todo: may want to use a reducer for certain state  e.g. adding nodes to list -
//  may also remove need to deal with re-renders if add elements to state rather than recreating...

export const defaultSettings = {
    title: true,
    company: true,
    jobId: false,
    location: true,
    adProvider: true,
    mesco: true,
    ingestionMethod: true,
    pricingType: true,
    formattedDate: true,
    dateRecency: true,
    provider: true,
    providerCode: true,
    applyType: true,
    xCode: true,
    seoJobId: false
};


interface DisplayJobProperty {
    [key: string]: boolean;
}

function settingsReducer(settings: object, setting: DisplayJobProperty): object {
    console.log('reducer');
    console.log(settings);
    console.log(setting);
    return { ...settings, ...setting };
}

// then instead of useState([]), useReducer(reducer, [])



// @ts-ignore
const ReduxProvider = ({ children }) => {

    const [settings, setSettings] = useState({
        title: true,
        company: true,
        jobId: false,
        location: true,
        adProvider: true,
        mesco: true,
        ingestionMethod: true,
        pricingType: true,
        formattedDate: true,
        dateRecency: true,
        provider: true,
        providerCode: true,
        applyType: true,
        xCode: true,
        seoJobId: false
    });
    const [numberResults, setNumberResults] = useState(0);
    const [results, setResults] = useState(true);
    const [mobileResults, setMobileResults] = useState(true);
    const [display, setDisplay] = useState(true);
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [request, setRequest] = useState([]);
    const [redux, setRedux] = useState({});

    log({logType: 'INFO', message: 'ReduxProvider mounted' });



    const handleMessage = (message: MessageType) => {
        log({ logType: 'MESSAGE_RECEIVED', functionName: 'handleMessage', payload: message });
        if (message.type === "DISPLAY_STATUS") {
            // updateDisplay(message.display);
        }
        if (message.type === "SETTINGS_STATUS") {
            // todo - apply settings
        }

        // @ts-ignore    // checking property name is valid
        if (message.type === "TOGGLE_SETTING" && defaultSettings[message.payload] !== 'undefined') {

            // @ts-ignore
            setSettings(settings => {
                // @ts-ignore
                    let prevSettingValue = settings[message.payload];
                    let nextSetting = {};
                    // @ts-ignore
                    nextSetting[message.payload] = !prevSettingValue;

                    log({logType: 'INFO', message: 'new state in reducer', payload: {...settings, ...nextSetting}});
                    return { ...settings, ...nextSetting };
                }
            );
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


        chrome.runtime.onMessage.addListener((message: MessageType) => {
            handleMessage(message);
        });







        window.addEventListener("message", function (e) {
            if (e.data?.messageType === 'RESULTS_UPDATED') {



                // todo - cannot receive dom elements - so instead, just need to respond to x new elements



            }
        });


        // todo - need to detach this? does listener get added every render?
        window.addEventListener("message", function (e) {

            if (e.data?.messageType === 'JOB_STATE') {
                let newState = e.data.payload;
                let json = JSON.parse(newState);
                const {jobsList} = json;

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

                log({logType: 'INFO', message: 'Context - useEffect: state is updated:  ReduxProvider updated', payload: {jobs, loading, redux, request}  })
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