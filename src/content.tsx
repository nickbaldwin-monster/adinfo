/*
    this is run as a content script, injected into the Monster web page

    responsibilities:
        - add iframe to page (to enable context listening to changes in storage)
        - inject app: add container to page and mount react app in container
        - monitor search results and notify context
 */

import React, { useReducer, createContext } from 'react';
import * as ReactDOM from "react-dom";

import { logger } from "./helpers/logger";
import { ReduxProvider } from "./context/Context";
import { Iframe } from "./components/Iframe";

import { Drawer } from "./panels/Drawer";
// alternative to Drawer - keep just in case
// import {Tabs} from "./panels/Tabs";

import "./content.css";

const moduleName = 'content';
let log = logger(moduleName);
log({ logType: 'LOADED' });





// wrap the display with data and state managed by context
const DrawerWithContext = () => {
    return (
        <ReduxProvider>
            <Drawer />
        </ReduxProvider>
    );
};



const injectApp = () => {
    let app = document.querySelector('#app');
    if (app === null) {
        log({logType: 'ERROR', message: '#app not found - cannot mount display'});
    }
    else {
        let container = document.createElement("div");
        container.id = 'appContainer';
        app.appendChild(container);
        ReactDOM.render(<DrawerWithContext />, container);
        let display = document.querySelector('#appContainer');
        if (display === null) {
            log({logType: 'ERROR', message: 'display not mounted'});
        }
    }
};



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



const monitor = () => {
    const poller = setInterval(() => {
        const list = document.querySelector('.results-list');
        if (list !== null) {
            clearInterval(poller);
            // notify initial results
            window.postMessage({ type: 'RESULTS_UPDATED', payload: list.children.length }, "*");
            // monitor additional results to add decorations
            const observer = new MutationObserver((mutations: any) => {
                window.postMessage({ type: 'RESULTS_UPDATED', payload: mutations.length }, "*");
            });
            // @ts-ignore
            observer.observe(list, {
                childList: true // report added/removed nodes
            });
        }
    }, 100);
}





const init = () => {
    addIframe();
    injectApp();
    monitor();
}

// todo - can this be removed and set in manifest?
if (document.readyState !== 'loading') {
    init();
}
else {
    document.addEventListener('DOMContentLoaded', function () {
        init();
    });
}

