/*
    this is run as a content script, injected into the Monster web page

    responsibilities:
        - add script tag into page (to enable looking at react element properties)
          in order to monitor search results (via react props) and search context
        - inject app: add container to page and mount plugin ui in container
        - notify context (via messages) about search results and search context
 */

import React from 'react';
import * as ReactDOM from "react-dom";

import { ReduxProvider } from "./context/Context";
import { PluginWindowRouter } from "./windows/PluginWindowRouter";
import { monitorReactNodes } from "./scripts/monitorReactNodes";

import "./content.css";

import { logger } from "./helpers/logger";
const moduleName = 'content';
let log = logger(moduleName);



// wrap the display with data and state managed by context
const DrawerWithContext = () => {
    return (
        <ReduxProvider>
            <PluginWindowRouter />
        </ReduxProvider>
    );
};


const injectApp = () => {
    let app = document.querySelector('body');
    if (app === null) {
        log({
            logType: 'ERROR',
            error: '#app not found - cannot mount display'
        });
    }
    else {
        let container = document.createElement("div");
        container.id = 'appContainer';
        app.appendChild(container);
        ReactDOM.render(<DrawerWithContext />, container);
        let display = document.querySelector('#appContainer');
        if (display === null) {
            log({
                logType: 'ERROR',
                error: 'display not mounted'
            });
        }
        else {
            log({
                logType: 'INFO',
                error: 'UI mounted'
            });
        }

    }
};



if (document.readyState !== 'loading') {
    injectApp();

    const script = document.createElement('script');
    script.textContent = '(' + monitorReactNodes + ')();';
    script.title = 'script';
    (document.head||document.documentElement).appendChild(script);
    script.remove();
}
else {
    document.addEventListener('DOMContentLoaded', function () {
        injectApp();
    });
}
