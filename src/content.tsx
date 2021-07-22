/*
    this is run as a content script, injected into the Monster web page

    responsibilities:
        - add iframe to page (to enable context listening to changes in storage)
        - inject app: add container to page and mount react app in container
        // todo - move into context?
        - monitor search results and pass on to context? or decorate items here?
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

// todo - refactor into context
import { transformJobs } from './helpers/transformJobs';



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

const addDecorations = () => {
    let resultLists = document.querySelectorAll('.results-list');

    if (resultLists) {
        const splitElements: Element[] = Array.from(resultLists[0].children);
        const mobileElements: Element[] = Array.from(resultLists[1].children);
        const elements = [...splitElements, ...mobileElements];

        elements.forEach((el: Element, i) => {
            if (el.children[0].children.length === 2) {
                let container = document.createElement("div");
                container.innerText = '' + (i + 1);
                el.children[0].appendChild(container);
                container.setAttribute('class', 'result-decoration');
            }
        });
    }
};

function onMutation(mutations: any) {
    const functionName = 'onMutation';
    if (mutations.length > 0) {
        log({logType: 'INFO', functionName, message: 'mutations observed' + mutations.length});

        // todo update state


        // todo - only update mutations
        let resultLists = document.querySelectorAll('.results-list');

        if (resultLists) {
            const splitElements: Element[] = Array.from(resultLists[0].children);
            const mobileElements: Element[] = Array.from(resultLists[1].children);
            const elements = [...splitElements, ...mobileElements];

            elements.forEach((el: Element, i) => {

                if (el.children[0].children.length === 2) {
                    let container = document.createElement("div");
                    container.innerText = '' + (i + 1);
                    el.children[0].appendChild(container);
                    container.setAttribute('class', 'result-decoration');
                }
            })
        }
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

// let poller;
const monitor = () => {
    const poller = setInterval(() => {
        if (document.querySelector('.results-list') !== null) {
            clearInterval(poller);

            // add decorations to initial results
            addDecorations();

            // monitor additional results to add decorations
            const list = document.querySelector('.results-list');
            const observer = new MutationObserver(onMutation);
            // @ts-ignore
            observer.observe(list, {
                childList: true, // report added/removed nodes
            });
        }

    }, 100);
}





const init = () => {
    addIframe();
    injectApp();
    monitor();

    // todo - may change this to poll AFTER table render e.g. when result size = state size
    // i.e. when react stops messing with dom

}



// todo - can this be removed and set in manifest?
if ( document.readyState !== 'loading' ) {
    init();
} else {
    document.addEventListener('DOMContentLoaded', function () {
        init();
    });
}

