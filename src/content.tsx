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
import {logComponent} from "./helpers/reactHelper";

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
        log({
            logType: 'ERROR',
            message: '#app not found - cannot mount display'
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
                message: 'display not mounted'
            });
        }
    }
};



const addIframe = () => {
    const node = document.querySelector("#app");
    if (node === null) {
        log({
            logType: 'ERROR',
            message: '#app not found - cannot mount iframe'
        });
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
            window.postMessage({
                type: 'RESULTS_UPDATED',
                payload: list.children.length
            }, "*");
            // monitor additional results to add decorations
            const observer = new MutationObserver((mutations: any) => {
                window.postMessage({
                    type: 'RESULTS_UPDATED',
                    payload: mutations.length
                }, "*");
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




    const actualCode = '(' + function() {

        console.log('adinfo: injected script');


        const poller = setInterval(() => {
            const list = document.querySelector('.results-list');
            if (list !== null) {
                clearInterval(poller);


                for (const key in list) {
                    if (key.startsWith('__reactInternalInstance$')) {

                        console.log('adinfo: injected script: react node found');
                        // @ts-ignore
                        const fiberNode = list[key];
                        console.log(fiberNode);
                        console.log(fiberNode?.return);
                        console.log(fiberNode.return?.stateNode);
                    }
                }
            }
        }, 100);



        // todo - remove this block!
        // #########
        // #########
        // #########

        // @ts-ignore
        window.__testThisFunction = function () { console.log('it works');}
        // @ts-ignore
        window.__findReactComponent = function (el) {
            for (const key in el) {
                if (key.startsWith('__reactInternalInstance$')) {
                    const fiberNode = el[key];
                    console.log(fiberNode);
                    console.log(fiberNode?.return);
                    console.log(fiberNode.return?.stateNode);
                    return fiberNode && fiberNode.return && fiberNode.return.stateNode;
                }
            }
            return null;
        }

// @ts-ignore
        window.__findReactComponentNode = function (el) {
            for (const key in el) {
                if (key.startsWith('__reactInternalInstance$')) {
                    const fiberNode = el[key];
                    console.log(fiberNode);
                    console.log(fiberNode?.return);
                    console.log(fiberNode.return?.stateNode);
                    return fiberNode;
                }
            }
            return null;
        }





        // @ts-ignore
        window.__findReact = function (dom, traverseUp = 0) {

            const key = Object.keys(dom).find(key=>key.startsWith("__reactInternalInstance$"));
            console.log(key)
            // @ts-ignore
            const domFiber = dom[key];
            if (domFiber == null) return null;

            // react <16
            if (domFiber._currentElement) {
                let compFiber = domFiber._currentElement._owner;
                for (let i = 0; i < traverseUp; i++) {
                    compFiber = compFiber._currentElement._owner;
                }
                return compFiber._instance;
            }

            // react 16+
            const GetCompFiber = (fiber: any) =>{
                //return fiber._debugOwner; // this also works, but is __DEV__ only
                let parentFiber = fiber.return;
                while (typeof parentFiber.type == "string") {
                    parentFiber = parentFiber.return;
                }
                return parentFiber;
            };
            let compFiber = GetCompFiber(domFiber);
            for (let i = 0; i < traverseUp; i++) {
                compFiber = GetCompFiber(compFiber);
            }
            return compFiber.stateNode;
        }





        // @ts-ignore
        document.__findReactComponent = function (el) {
            for (const key in el) {
                if (key.startsWith('__reactInternalInstance$')) {
                    const fiberNode = el[key];

                    return fiberNode && fiberNode.return && fiberNode.return.stateNode;
                }
            }
            return null;
        }


        // console.log(window);
        // #########
        // #########
        // #########



    } + ')();';
    const script = document.createElement('script');
    script.textContent = actualCode;
    (document.head||document.documentElement).appendChild(script);
    script.remove();


}
else {
    document.addEventListener('DOMContentLoaded', function () {
        init();
    });
}

