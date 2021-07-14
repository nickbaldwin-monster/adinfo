import React, { createContext, useContext, useState, useEffect } from "react";
import { getRedux } from "../adapters/redux";
import { logger } from "../helpers/logger";
import {transformJobs} from "../helpers/transformJobs";
import {transformRequest} from "../helpers/transformRequest";

const moduleName = 'Context';
let log = logger(moduleName);
log({ logType: 'LOADED' });


const ReduxContext = createContext({});
const { Provider, Consumer } = ReduxContext;

// @ts-ignore
const ReduxProvider = ({ children }) => {

    const [dog, setDog] = useState({});
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [request, setRequest] = useState([]);
    const [redux, setRedux] = useState({});

    log({logType: 'INFO', message: 'ReduxProvider mounted' });

    useEffect(() => {
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

                log({logType: 'INFO', message: 'Context - useEffect: state is updated:  ReduxProvider updated', payload: {jobs, dog, loading, redux, request}  })
            }
        });
    }, []);

    return (
        <Provider value={{ jobs, setJobs, request, redux, dog, loading }} >
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