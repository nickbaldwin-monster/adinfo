import React from 'react';

import { HashRouter, Switch, Route, withRouter } from "react-router-dom";
import { SettingsPanel } from "../panels/SettingsPanel";
import DrawerRouterContainer from "./DrawerRouterContainer";
import { JobTable } from "../panels/JobTable";
import { RequestTable } from "../panels/RequestTable";
import { Feedback } from "../panels/Feedback";
import { ErrorsPanel } from "../panels/ErrorsPanel";
import { LoginPanel } from "../panels/LoginPanel";

export const Drawer = () => {
    return (
    <>
        <HashRouter>
            <DrawerRouterContainer>
                <Switch>
                    <Route exact={true} path="/" component={JobTable} />
                    <Route exact={true} path="/settings" component={SettingsPanel} />
                    <Route exact={true} path="/errors" component={ErrorsPanel} />
                    <Route exact={true} path="/feedback" component={Feedback} />
                    <Route exact={true} path="/info" component={RequestTable} />
                    <Route exact={true} path="/login" component={LoginPanel} />
                </Switch>
            </DrawerRouterContainer>
        </HashRouter>
    </>
    );
};