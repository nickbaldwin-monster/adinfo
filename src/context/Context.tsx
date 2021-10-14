import React, { createContext, useContext, useState, useEffect, useReducer } from "react";

import { logger } from "../helpers/logger";

import { MessageType } from "../types/types";
import { defaultErrors, Errors } from '../types/Errors';
import { decorateResults, removeDecorations } from '../helpers/decorateResults';
import { determineErrors } from "../helpers/determineErrors";
import { Job } from "../types/Job";
import { SearchContext } from "../types/SearchContext";
import { transformSearchContext } from "../helpers/transformSearchContext";
import { getSavedSettings, saveSettings } from "../helpers/store";
import { userSettingsReducer, UserSettings, trJob, transformJobsNew } from "../model/dataModel";



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
    const [errors, setErrors] = useState(defaultErrors);
    const [numberResults, setNumberResults] = useState(0);
    const [results, setResults] = useState(true);
    const [mobileResults, setMobileResults] = useState(true);
    const [decorate, setDecorate] = useState(true);
    const [displayDevInfo, setDisplayDevInfo] = useState(false);
    const [display, setDisplay] = useState(true);
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [request, setRequest] = useState([]);
    const [redux, setRedux] = useState({});
    const [hoverResult, setHoverResult] = useState(-1);
    const [selected, setSelected] = useState(-1);
    const [auth, setAuth] = useState(false);

    let defaultState: ContextItem[] = [];
    const [searchContext, setSearchContext] = useState(defaultState);
    const [searchId, setSearchId] = useState('');




    log({
        logType: 'INFO',
        message: 'ReduxProvider mounted'
    });



    const updateSettings = (settingName: string) => {

        console.log(' updating settings');
        /*
            message: {
                type: "TOGGLE_SETTING"
                payload: "title"
                source?: "background" // ?
            }
        */

        setSettings((settings: UserSettings) => {
            let updated = userSettingsReducer(settings, settingName);
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
        console.log('Need to highlight and scroll to item in results');

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


    const decorateRef = React.useRef(decorate);
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
                payload: {decorate: !decorate}
            });
            decorateRef.current = !decorate;
            return !decorate;
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

        let searchId = context?.location?.searchId;
        setSearchId(searchId);
        let flattened = transformSearchContext(context);
        if (Array.isArray(flattened )) {
            // @ts-ignore
            setSearchContext( flattened);
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
        if (decorateRef.current) {
            decorateResults(transformedJobs);
        }
        else {
            removeDecorations();
        }


    }





    const handleMessage = (message: MessageType) => {

        // @ts-ignore
        if (message.type === "__REACT_CONTEXT_DEVTOOL_GLOBAL_HOOK_EVENT") return;
        log({
            logType: 'MESSAGE_RECEIVED',
            functionName: 'handleMessage',
            payload: message
        });

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

        if (message.type === "JOB_SELECTED") {
            console.log('selection message recieved');
            updateSelected(message.payload);
        }

        if (message.type === "TOGGLE_SETTING") {
            updateSettings(message.payload);
        }

        if (message.type === "TOGGLE_DISPLAY_DEV_INFO") {
            setDisplayDevInfo((prevState: boolean) => !prevState);
        }





        // for old views
        if (message.type === 'JOB_STATE') {
            // console.log('JOB_STATE', message.payload);
            // updateJobsAndRequest(message.payload);
        }



        // for new views
        if (message.type === 'JOB_PROPS') {
            updateJobs(message.payload);
        }
        if (message.type === 'SEARCH_CONTEXT_UPDATED') {
            updateSearchContextAndId(message.payload);
        }



        if (message.type === 'HOVER_RESULTS') {
            console.log('HOVER_RESULTS', message.payload);
            setHoverResult(message.payload);
        }

        // todo - needed????
        if (message.type === 'RESULTS_UPDATED') {

            // todo - cannot receive dom elements - so instead, just need to respond to x new elements

            // decorateResults(message.payload);
            log({
                logType: 'INFO',
                message: message.type,
                payload: message
            });
        }


        if (message.type === 'LOGIN_COMPLETED') {
            console.log('LOGIN COMPLETED', message);
            setAuth(true);
        }

        if (message.type === 'LOGIN_CHECKED') {
            console.log('LOGIN STARTED', message);
            setAuth(true);
        }

        if (message.type === 'LOGOUT') {
            console.log('LOGOUT', message);
            setAuth(false);
        }

        if (message.type === 'AUTH_STATUS_RESPONSE') {
            console.log('AUTH_STATUS_RESPONSE', message);
            setAuth(message.payload);
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
                let message = { ...e.data, jobs };
                handleMessage(message);
            }
        });

    }, []);




    return (
        <Provider value={{
            hoverResult, setHoverResult,
            selected, setSelected,
            display, setDisplay,
            decorate,
            jobs, setJobs,

            searchContext,
            searchId,

            request,
            redux,
            loading,
            settings,
            numberResults,
            errors,

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