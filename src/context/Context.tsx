import React, { createContext, useContext, useState, useEffect, useReducer } from "react";
import { logger } from "../helpers/logger";
import { transformJobs } from "../helpers/transformJobs";
import { transformRequest } from "../helpers/transformRequest";



const moduleName = 'Context';
let log = logger(moduleName);
log({ logType: 'LOADED' });


const ReduxContext = createContext({});
const { Provider, Consumer } = ReduxContext;


// todo: may want to use a reducer for certain state  e.g. adding nodes to list -
//  may also remove need to deal with re-renders if add elements to state rather than recreating...

const defaultSettings = {
    title: true,
    company: true,
    jobId: true,
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
    xCode: true
};


interface DisplayJobProperty {
    [key: string]: boolean;
}

function settingsReducer(state: object, item: DisplayJobProperty): object {
    return { ...state, item };
}

// then instead of useState([]), useReducer(reducer, [])



// @ts-ignore
const ReduxProvider = ({ children }) => {

    const [settings, setSettings] = useReducer(settingsReducer, defaultSettings);
    const [numberResults, setNumberResults] = useState(0);
    const [results, setResults] = useState(true);
    const [mobileResults, setMobileResults] = useState(true);
    const [display, setDisplay] = useState(true);
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [request, setRequest] = useState([]);
    const [redux, setRedux] = useState({});

    log({logType: 'INFO', message: 'ReduxProvider mounted' });

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