// this is run as a content script, injected into the web page

import * as React from "react";
import * as ReactDOM from "react-dom";

import { MessageType } from "./types";
import { logger } from "./helpers/logger";
import { Iframe } from "./components/Iframe";
import { Display } from "./panels/Display";
import "./content.css";

import { transformJobs } from './helpers/transformJobs';


let header: any;
let displayContainer: any;
let display = false;

const moduleName = 'content';
let log = logger(moduleName);
log({ logType: 'LOADED' });



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

const updateDisplay = (isDisplay: boolean) => {
    display = isDisplay;
    if (isDisplay) {
        header?.appendChild(displayContainer);
    } else {
        displayContainer?.parentNode?.removeChild(displayContainer);
    }

}

const handleMessage = (message: MessageType) => {
    log({ logType: 'MESSAGE_RECEIVED', functionName: 'N/A', payload: message });
    if (message.type === "DISPLAY_STATUS") {
        updateDisplay(message.display);
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
    header = document.querySelector('header');
    if (header === null) {
        log({logType: 'ERROR', message: '#app not found - cannot mount display'});
    }
    else {
        displayContainer = document.createElement("div");
        displayContainer.className = "monsterInfo";
        ReactDOM.render(<Display/>, displayContainer);
    }
};



function onMutation(mutations: any) {
    const functionName = 'onMutation';
    if (mutations.length > 0) {
        log({logType: 'INFO', functionName, message: 'mutations observed'});
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
    updateDisplay(display);


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



