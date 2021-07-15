import React, {useReducer, useContext, useEffect} from 'react';
import * as ReactDOM from "react-dom";
import {HashRouter, Switch, Route, withRouter} from "react-router-dom";
import { Test } from "../components/Test";
import DrawerRouterContainer from "./DrawerRouterContainer";
import { JobTable } from "../components/JobTable";
import { RequestTable } from "../components/RequestTable";
import {logger} from "../helpers/logger";


const moduleName = 'Drawer';
let log = logger(moduleName);
log({ logType: 'LOADED' });


export const Drawer = () => {

    /*
    // move and trigger when list is rendered
    useEffect(() => {
        let resultLists = document.querySelectorAll('.results-list');
        if (resultLists) {
            const splitElements: Element[] = Array.from(resultLists[0].children);
            const mobileElements: Element[] = Array.from(resultLists[1].children);
            const elements = [...splitElements, ...mobileElements];

            elements.forEach((el: Element) => {
                let container = document.createElement("div");
                container.innerText = 'hi';
                el.children[0].appendChild(container);
            })
        }

    });

     */

    return (
    <>
        <HashRouter>
            <DrawerRouterContainer>
                <Switch>
                    <Route exact={true} path="/" component={JobTable}/>
                    <Route exact={true} path="/request" component={RequestTable}/>
                    <Route exact={true} path="/settings" component={Test}/>
                </Switch>
            </DrawerRouterContainer>
        </HashRouter>
    </>
    );
};