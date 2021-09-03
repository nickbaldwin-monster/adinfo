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
                error: 'display mounted'
            });
        }


    }
};


// iframe is used for old views - detects when local storage is updated and sends message
// can be removed once new views are used in all domains

const addIframe = () => {

    // const node = document.querySelector("#app") || document.querySelector("body");
    const node = document.querySelector("body");
    if (node === null) {
        log({
            logType: 'ERROR',
            error: '#app not found - cannot mount iframe'
        });
    }
    else {
        let d = document.createElement("div");
        node?.appendChild(d);
        d?.setAttribute("id", "container");
        const mount = document.getElementById("container");
        const t = (<Iframe content={''}/>);
        ReactDOM.render(t, mount);
        log({
            logType: 'INFO',
            message: '#app iframe mounted'
        });





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
                payload: list.children.length,
                source: moduleName
            }, "*");
            // monitor additional results to add decorations
            const observer = new MutationObserver((mutations: any) => {
                window.postMessage({
                    type: 'RESULTS_UPDATED',
                    payload: mutations.length,
                    source: moduleName
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
    // monitor();
}





// todo - can this be removed and set in manifest?
if (document.readyState !== 'loading') {
    init();

    const actualCode = '(' + function() {

        const sendResults = (results: Element) => {
            for (const key in results) {
                if (key.startsWith('__reactFiber$')) {

                    // @ts-ignore
                    let item = results[key];
                    let numberIt = 0;

                    while (item.memoizedProps.items === undefined && numberIt < 15) {
                        item = item?.return;
                        numberIt++;
                    }

                    // console.log('iterations: ', numberIt);
                    // console.log('item: ', item);
                    if (item.memoizedProps.items) {

                        // todo
                        let message = `job state changed: ${item.memoizedProps.items.length} jobs`;

                        // log({ logType: 'INFO', message });
                        window.postMessage({
                            type: 'JOB_PROPS',
                            payload: item.memoizedProps.items,
                            source: 'content'
                        }, "*");


                    }
                }
            }
        }

        console.log('adinfo: injected script');
        const poller = setInterval(() => {

            // both card view and split view have this when list is rendered
            const cards = document.querySelector('.infinite-scroll-component');
            if (cards !== null) {
                clearInterval(poller);

                // todo - deal with both being present, and switching layout

                // split view - container of cards
                // "[class^='splitviewstyle__CardGridSplitView']"

                // card view - container of cards
                // "[class=^'job-search-resultsstyle__CardGrid']"

                const cardList = document.querySelector("[class^='job-search-resultsstyle__CardGrid']");
                // console.log('cardList: ', cardList);

                const cardListSplit = document.querySelector("[class^='splitviewstyle__CardGridSplitView']");
                // console.log('cardListSplit: ', cardListSplit);






                let results: Element | null = null;
                if (cardList) {
                    results = cardList;
                }
                // bias to cardListSplit
                if (cardListSplit) {
                    results = cardListSplit;
                }

                let timeout: NodeJS.Timeout;
                const handleMove = (event: Event ) => {
                    clearTimeout(timeout);
                    timeout = setTimeout(() => {
                        // console.log("mousemove!", event);
                        // @ts-ignore
                        let path = event.path || evwnt.composedPath();
                        try {
                            for (let i = 0; i <  path.length; i++) {
                                if (path[i].nodeName === 'ARTICLE') {
                                    // console.log(path[i]);
                                    let id = path[i].getAttribute('data-test-id');
                                    let match = id.match(/-component-(\d*)$/);

                                    let pos;
                                    if (match) {
                                        pos = parseInt(match[1]) + 1;


                                        window.postMessage({
                                            type: 'HOVER_RESULTS',
                                            payload: pos,
                                            source: 'content'
                                        }, "*");


                                    }

                                    // todo - want to do any checks???!!!
                                    // console.log(pos);
                                    let child = path[i].children[0];
                                    let link = child?.href;
                                    let decoration = child.children[child.children.length - 1];
                                    if (decoration && decoration.nodeName === 'DIV') {
                                        let position = parseInt(decoration.children[0]?.children[2]?.innerText);
                                        if (position !== pos) {
                                            console.log('ERROR with position')
                                        }
                                    }
                                    break;
                                }
                            }
                        }
                        catch (e) {
                            console.log(e);
                        }
                    }, 200);
                }

                // monitor updates to card list
                if (results) {

                    if (window.PointerEvent) {
                        results.addEventListener("pointermove", handleMove);
                    } else {
                        results.addEventListener("mousemove", handleMove);
                        console.log('no pointer?!')
                    }

                    // todo - need to send initial results, or observer does that now?
                    // results && sendResults(results);

                    const observer = new MutationObserver((mutations: any) => {
                        console.log('UPDATES')
                        results && sendResults(results);
                    });

                    // @ts-ignore
                    observer.observe(results, {
                        childList: true // report added/removed nodes
                    });
                }

            }


        }, 100);




        /*
            <div className="job-search-resultsstyle__LoadMoreContainer-sc-1wpt60k-1 htsqfC">
                <button aria-pressed="false" className="sc-dkPtyc jRkyeO  ds-button" disabled="" role="button" type="button"
                        shape="rectangle">No More Results
                </button>
            </div>
         */


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










/*
 const header = document.querySelector('.ds-header');
 console.log('header');
 console.log(header);
 for (const key in header) {
     if (key.startsWith('__reactFiber$')) {
         console.log('header has key');

         // @ts-ignore
         let item = header[key];
         console.log(item);

         let numberIt = 0;
         // numberIt should be 16
         while (item.memoizedState?.baseState?.client === undefined && numberIt < 20) {
             item = item?.return;
             numberIt++;
         }

         if (item.memoizedState?.baseState) {
             console.log(numberIt++);
             console.log(item.memoizedState?.baseState);

             window.postMessage({
                 type: 'REQUEST',
                 payload: item.memoizedState?.baseState,
                 source: 'content'
             }, "*");

         }


     }
 }
*/