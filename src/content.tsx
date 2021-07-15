// this is run as a content script, injected into the web page

import React, { useReducer, createContext } from 'react';
import * as ReactDOM from "react-dom";

import { MessageType } from "./types";
import { logger } from "./helpers/logger";
import { Iframe } from "./components/Iframe";
import { JobTable } from "./components/JobTable";


import { Drawer } from "./panels/Drawer";


import "./content.css";

import { transformJobs } from './helpers/transformJobs';








import { ReduxProvider } from "./context/Context";
import {Tabs} from "./panels/Tabs";









const moduleName = 'content';
let log = logger(moduleName);
log({ logType: 'LOADED' });


// @ts-ignore
export const State = createContext();

function reducer(state: any, item: any) {
    return [...state, item]
}

const WrapContext = () => {

    const [jobs, setJobs] = React.useState([]);
    const [request, setRequest] = React.useState([]);
    const [redux, setRedux] = React.useState({});
    const [settings, setSettings] = React.useState({});
    const [results, setResults] = React.useState([]);

    const [salad, setSalad] = useReducer(reducer, ['a', 'b']);

    return(
        <State.Provider value={{
            salad, setSalad,
            jobs, setJobs,
            request, setRequest,
            redux, setRedux,
            settings, setSettings,
            results, setResults
        }}>
            <Drawer />
        </State.Provider>
    );
};


// <Drawer />
//  <Tabs />

const WithContext = () => {
    return (
        <ReduxProvider>
            <Drawer />
        </ReduxProvider>
    );
};




// listen to messages from the iframe
// enables passing the session storage events to the window (and background fyi)
const listenToIframe = () => {
    window.addEventListener("message", function (e) {
        if (e.data?.messageType === 'JOB_STATE') {
            let newState = e.data.payload;
            let json = JSON.parse(newState);
            const { jobsList } = json;
            log({ logType: 'INFO', moduleName, message: 'job list updated', payload: json });
            log({ logType: 'INFO', moduleName, message: 'job list updated', payload: jobsList });

            let jobs = transformJobs(jobsList);
            log({ logType: 'INFO', moduleName, message: 'job list transformed', payload: jobs });
            // todo - not needed?
            chrome.runtime.sendMessage({ type: "JOB_STATE", source: 'content', payload: jobs });
            log({ logType: 'MESSAGE_SENT',  payload: { type: "JOB_STATE", source: 'content', payload: jobs }});

            // todo - use the job list!


        }
    });
}


const listenToScripts = () => {
    chrome.runtime.onMessage.addListener((message: MessageType) => {
        handleMessage(message);
    });
};



const handleMessage = (message: MessageType) => {
    log({ logType: 'MESSAGE_RECEIVED', functionName: 'N/A', payload: message });
    if (message.type === "DISPLAY_STATUS") {
        // updateDisplay(message.display);
    }
    if (message.type === "SETTINGS_STATUS") {
        // todo - apply settings
    }
};




// don't need this, as we are getting new state directly from change event
const getReduxStore = () => {
    if (window.sessionStorage.getItem("savedReduxState")) {
        const json = window.sessionStorage.getItem("savedReduxState");

        if (json) {
            let redux = JSON.parse(json);
            //
        }
    }
}



const addTable = () => {
    let app = document.querySelector('#app');
    if (app === null) {
        log({logType: 'ERROR', message: '#app not found - cannot mount display'});
    }
    else {
        let container = document.createElement("div");
        container.id = 'appContainer';
        app.appendChild(container);
        //ReactDOM.render(<WrapContext />, container);

        ReactDOM.render(<WithContext />, container);





    }
};



function onMutation(mutations: any) {
    const functionName = 'onMutation';
    if (mutations.length > 0) {
        log({logType: 'INFO', functionName, message: 'mutations observed' + mutations.length});
        // todo update state
    }
}


const addIframe = () => {
    const node = document.querySelector("#app");
    if (node === null) {
        log({logType: 'ERROR', message: '#app not found - cannot mount iframe'});
    }
    else {
        let d = document.createElement("div");
        node?.appendChild(d);
        d?.setAttribute("id", "container");
        const mount = document.getElementById("container");
        const t = (<Iframe content={''}/>);
        ReactDOM.render(t, mount);
    }
}

const init = () => {

    addIframe();
    listenToIframe();
    listenToScripts();
    addTable();


    // todo - not needed - unless need to do something when list is loaded
    // i.e. when react stops messing with dom
    const poller = setInterval(() => {
        if (document.querySelector('.results-list') !== null) {
            clearInterval(poller);

            const list = document.querySelector('.results-list');
            const observer = new MutationObserver(onMutation);
            // @ts-ignore
            observer.observe(list, {
                childList: true, // report added/removed nodes
            });
        }
    }, 100);

}



// MAIN

// todo - can this be removed and set in manifest?
if ( document.readyState !== 'loading' ) {
    init();
} else {
    document.addEventListener('DOMContentLoaded', function () {
        init();
    });
}

chrome.runtime.sendMessage({ type: "REQ_DISPLAY_STATUS", source: 'content' });
log({ logType: 'MESSAGE_SENT',  payload: {type: "REQ_DISPLAY_STATUS"}});



