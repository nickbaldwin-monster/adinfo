import React from 'react';

import { HashRouter, Switch, Route, withRouter } from "react-router-dom";
import { SettingsPanel } from "./SettingsPanel";
import DrawerRouterContainer from "./DrawerRouterContainer";
import { JobTable } from "./JobTable";
import { RequestTable } from "./RequestTable";
import { Feedback } from "./Feedback";
import { logger } from "../helpers/logger";
import { ErrorsPanel } from "./ErrorsPanel";
import {LoginTestPanel} from "./LoginTestPanel";




const moduleName = 'Drawer';
let log = logger(moduleName);
log({ logType: 'LOADED' });


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
                    <Route exact={true} path="/login" component={LoginTestPanel} />
                </Switch>
            </DrawerRouterContainer>
        </HashRouter>
    </>
    );
};