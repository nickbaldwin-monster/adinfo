import * as React from "react";
import * as ReactDOM from "react-dom";
import { HashRouter, Switch, Route } from "react-router-dom";
import { Test } from "../components/Test";

import DrawerRouterContainer from "./DrawerRouterContainer";

export const Drawer = () => {
    return (
    <>
        <HashRouter>
            <DrawerRouterContainer>
                <Switch>
                    <Route exact={true} path="/" component={Test}/>
                </Switch>
            </DrawerRouterContainer>
        </HashRouter>
    </>
    );
};