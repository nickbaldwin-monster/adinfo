import React from 'react';

import { HashRouter, Switch, Route, withRouter } from "react-router-dom";
import { SettingsPanel } from "../panels/SettingsPanel";
import DrawerRouterContainer from "./DrawerRouterContainer";
import { JobPanel } from "../panels/JobPanel";
import { InfoPanel } from "../panels/InfoPanel";
import { FeedbackPanel } from "../panels/FeedbackPanel";
import { ErrorsPanel } from "../panels/ErrorsPanel";
import { LoginPanel } from "../panels/LoginPanel";

export const Drawer = () => {
    return (
    <>
        <HashRouter>
            <DrawerRouterContainer>
                <Switch>
                    <Route exact={true} path="/" component={JobPanel} />
                    <Route exact={true} path="/settings" component={SettingsPanel} />
                    <Route exact={true} path="/errors" component={ErrorsPanel} />
                    <Route exact={true} path="/feedback" component={FeedbackPanel} />
                    <Route exact={true} path="/info" component={InfoPanel} />
                    <Route exact={true} path="/login" component={LoginPanel} />
                </Switch>
            </DrawerRouterContainer>
        </HashRouter>
    </>
    );
};