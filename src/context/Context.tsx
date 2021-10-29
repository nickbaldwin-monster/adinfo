import React, { createContext, useContext, useState, useEffect, useReducer } from "react";

import { logger } from "../helpers/logger";

import { MessageType } from "../types/types";
import { defaultErrors, Errors } from '../types/Errors';
import { decorateResults, removeDecorations } from '../helpers/decorateResults';
import { determineErrors } from "../helpers/determineErrors";
import { Job } from "../types/Job";
import { SearchContext } from "../types/SearchContext";
import { transformSearchContext } from "../helpers/transformSearchContext";
import { getDecorateSetting, getDisplayDevInfoSetting, getSavedSettings, saveSettings } from "../helpers/store";
import { userSettingsReducer, UserSettings,  } from "../model/UserSettings";
import {  transformJobsNew } from "../model/transformJob";
import {
    sendMessageToBackgroundAndPopup,
    subscribeToExtensionMessages,
    subscribeToWindowMessages
} from "../helpers/messaging";

const moduleName = 'Context';
let log = logger(moduleName);
log({ logType: 'LOADED' });


// todo - rename
const ReduxContext = createContext({});
const { Provider, Consumer } = ReduxContext;


// todo: may want to use a reducer for certain state  e.g. adding nodes to list -
//  may also remove need to deal with re-renders if add elements to state rather than recreating...


interface ContextItem {
    [key: string]: [value: string];
}

interface DisplayJobProperty {
    [key: string]: boolean;
}

function settingsReducer(state: object, action: object): object {
    return {};
}



// todo -rename
// @ts-ignore
const ReduxProvider = ({ children }) => {

    const [settings, setSettings] = useState(getSavedSettings);
    const [display, setDisplay] = useState(true);
    const [jobs, setJobs] = useState([]);
    const [auctionBids, setAuctionBids] = useState("");
    const [decisionId, setDecisionId] = useState("");
    const [hoverResult, setHoverResult] = useState(-1);
    const [selected, setSelected] = useState(-1);
    const [auth, setAuth] = useState(false);
    const [version, setVersion] = useState("");

    let defaultState: ContextItem[] = [];
    const [searchContext, setSearchContext] = useState(defaultState);
    const [rawSearchContext, setRawSearchContext] = useState({});
    const [searchId, setSearchId] = useState('');

    const [request, setRequest] = useState([]);


    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState(defaultErrors);
    const [numberResults, setNumberResults] = useState(0);
    const [results, setResults] = useState(true);
    const [mobileResults, setMobileResults] = useState(true);





    log({
        logType: 'INFO',
        message: 'ReduxProvider mounted'
    });



    const decorateRef = React.useRef(settings?.featureSettings?.decorateResults?.enabled);

    const updateDataSettings = (settingName: string) => {
        setSettings((settings: UserSettings) => {
            let updated = userSettingsReducer(settings, settingName, 'dataSettings', 'visible');
            saveSettings(updated);
            return updated;
        });
    }
    // @ts-ignore
    const updateFeatureSettings = ({ settingName, property } ) => {

        if (settingName === 'decorateResults') {
            decorateRef.current = !decorateRef.current;
        }
        setSettings((settings: UserSettings) => {
            let updated = userSettingsReducer(settings, settingName, 'featureSettings', property);
            saveSettings(updated);
            return updated;
        });
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




    const updateSelected = (position: number) => {

        // todo!!!!
        // for split view
        let parent = document.querySelector('#card-scroll-container');



        let row = document.querySelector(`[data-test-id="svx-job-card-component-${position}"]`);

        let offset = position * 278;
        parent?.scrollTo(0, offset);
        /*
        // @ts-ignore
        let parentRectangle = parent.getBoundingClientRect();
        console.log('parentRectangle', parentRectangle);
        let parentViewableArea = {
            // @ts-ignore
            height: parent.clientHeight,
            // @ts-ignore
            width: parent.clientWidth
        };

        // @ts-ignore
        let childRectangle = row.getBoundingClientRect();
        console.log('childRectangle', childRectangle);
        let isViewable = (childRectangle.top >= parentRectangle.top)
            && (childRectangle.bottom <= parentRectangle.top + parentViewableArea.height);
        if (!isViewable) {
            const scrollTop = childRectangle.top - parentRectangle.top;
            const scrollBottom = childRectangle.bottom - parentRectangle.bottom;
            if (Math.abs(scrollTop) < Math.abs(scrollBottom)) {
                // @ts-ignore
                parent.scrollTop += scrollTop;
            }
            else {
                // @ts-ignore
                parent.scrollTop += scrollBottom;
            }
        }

         */


    }


    /* useref pattern


    const [myState, _setMyState] = useState(0);
    const myStateRef = React.useRef(myState);
    const setMyState = data => {
        myStateRef.current = data;
        _setMyState(data);
    };

     */

    const errorsRef = React.useRef(errors);
    const updateErrors = (newErrors: Errors) => {

        setErrors(() => {
            log({
                logType: 'INFO',
                message: 'new errors state in reducer',
                payload: {errors: errors}
            });
            errorsRef.current = newErrors;
            return newErrors;
        });
    }




    const updateSearchContextAndId = (context: SearchContext) => {

        /*
            message: {
                type: "SEARCH_CONTEXT_UPDATED",
                payload: {
                    client: {},
                    location: {},
                    user: {},
                    software: {}
                },
                source?: "content"
            }
        */

        // todo - useMemo?

        let searchId = context?.location?.searchId;
        setSearchId(searchId);
        setRawSearchContext(context);
        let flattened = transformSearchContext(context);
        if (Array.isArray(flattened )) {
            // @ts-ignore
            setSearchContext(flattened);
        }
    }




    const updateJobs = (jobs: Job[]) => {

        /*
            message: {
                type: "JOB_PROPS"
                payload: Job[]
                source?: "content"
            }
        */

        let transformedJobs = transformJobsNew({ jobResults: jobs });

        // @ts-ignore
        setJobs(transformedJobs);
        setNumberResults(transformedJobs.length);
        setLoading(false);
        if (transformedJobs.length > 0) {
            // @ts-ignore
            setDecisionId(transformedJobs[0].decisionId);
            // @ts-ignore
            let bids = transformedJobs[0]?.kevelData?.auctionBids || "";
            setAuctionBids(bids);
        }

        let e = determineErrors(transformedJobs);

        log({
            logType: 'INFO',
            message: 'errors',
            payload: e
        });

        setErrors(e);

        log({
            logType: 'INFO',
            message: 'Context - useEffect: state is updated:  ReduxProvider updated',
            payload: { jobs, loading, errors }
        });


        // todo - hack? - can this be moved into useEffect now that there is a ref???
        // if (decorateRef.current) {
        if (decorateRef.current) {
            decorateResults(transformedJobs);
        }
        else {
            removeDecorations();
        }


    }





    const handleMessage = (message: MessageType) => {

        if (message.type === "DISPLAY_STATUS") {
            // updateDisplay(message.display);
        }
        // todo - WIP
        if (message.type === "SAVED_SETTINGS_RESPONSE") {
            // todo - apply settings
            console.log('extension settings from background', message.payload);
        }




        if (message.type === "JOB_SELECTED") {
            updateSelected(message.payload);
        }



        if (message.type === "TOGGLE_SETTING") {
            updateDataSettings(message.payload);
        }
        if (message.type === "TOGGLE_DECORATE") {
            // @ts-ignore
            updateFeatureSettings(message.payload);
        }
        if (message.type === "TOGGLE_FEATURE_SETTING") {
            // @ts-ignore
            updateFeatureSettings(message.payload);
        }





        if (message.type === "TOGGLE_DISPLAY") {
            updateDisplay();
        }




        // injected script monitors the page and sends a message via window
        if (message.type === 'JOB_PROPS') {
            updateJobs(message.payload);
        }
        if (message.type === 'SEARCH_CONTEXT_UPDATED') {
            updateSearchContextAndId(message.payload);
        }
        if (message.type === 'HOVER_RESULTS') {
            setHoverResult(message.payload);
        }











        if (message.type === 'VERSION_RESPONSE') {
            console.log("VERSION", version);
            setVersion(message.payload);
        }



        if (message.type === 'LOGIN_STATUS_RESPONSE') {
            setAuth(message.payload);
            console.log("LOGIN_STATUS_RESPONSE", message.payload);
        }
        if (message.type === 'LOGOUT_RESPONSE') {
            setAuth(message.payload);
            console.log("LOGOUT_RESPONSE", message.payload);
        }
        if (message.type === 'LOGIN_RESPONSE') {
            setAuth(message.payload);
            console.log("LOGIN_RESPONSE", message.payload);
        }


    };



    useEffect(() => {


        // todo use subscribeToExtensionMessages(handleMessage);
        chrome.runtime.onMessage.addListener((message: MessageType) => {
            handleMessage(message);
        });


        // todo - refactor into types
        // todo - may need to pass on other messageTypes e.g. with auth, startup etc
        const messagesToPassOn = {
            'SEARCH_CONTEXT_UPDATED': true,
            'JOB_PROPS': true,
            'HOVER_RESULTS': true,
            'JOB_SELECTED': true
        }

        // todo - replace
        // subscribeToWindowMessages(handleMessage);
        window.addEventListener("message", function (e) {
            // @ts-ignore
            if (e.data?.type && messagesToPassOn[e.data.type]) {
                let message = { ...e.data };
                handleMessage(message);
            }
        });

        sendMessageToBackgroundAndPopup({
            type: 'SAVED_SETTINGS_REQUEST',
            source: 'context'
        });

        // request auth status
        sendMessageToBackgroundAndPopup({
            type: "LOGIN_STATUS_REQUEST",
            source: "context"
        });

        sendMessageToBackgroundAndPopup({
            type: "VERSION_REQUEST",
            source: "context"
        });


        // todo - remove event listeners as cleanup function
        // return () => {};

    }, []);




    return (
        <Provider value={{
            hoverResult, setHoverResult,
            jobs, setJobs,
            searchContext,
            rawSearchContext,
            selected, setSelected,
            display, setDisplay,
            searchId,
            request,

            loading,
            settings,
            numberResults,
            errors,
            auctionBids, decisionId,
            version,

            decorate: settings?.featureSettings?.decorateResults?.enabled,
            displayDevInfo: settings?.featureSettings?.displayDevInfo?.enabled,
            auth, setAuth
        }} >
            {children}
        </Provider>
    );
};


// todo - rename
const useReduxContext = () => {
    const state = useContext(ReduxContext);
    if (state === undefined) {
        throw new Error("adInfo: useReduxContext must be called within ReduxProvider");
    }

    log({
        logType: 'INFO',
        message: 'Context used',
        payload: state
    });

    return {
        ...state
    };
};



export { ReduxProvider, Consumer as ReduxConsumer, useReduxContext };
export default ReduxContext;