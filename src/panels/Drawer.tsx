import * as React from "react";
import * as ReactDOM from "react-dom";
import { HashRouter, Switch, Route } from "react-router-dom";
import { Test } from "../components/Test";

import DrawerRouterContainer from "./DrawerRouterContainer";
import {Display} from "./Display";
import {transformJobs} from "../helpers/transformJobs";
import {transformRequest} from "../helpers/transformRequest";

export const Drawer = () => {

    window.addEventListener("message", function (e) {
        if (e.data?.messageType === 'JOB_STATE') {
            console.log('window event in Drawer')
        }

    });



    return (
    <>
        <HashRouter>
            <DrawerRouterContainer>
                <Switch>
                    <Route exact={true} path="/" component={Display}/>
                </Switch>
            </DrawerRouterContainer>
        </HashRouter>
    </>
    );
};