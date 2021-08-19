import React from 'react';

import { HashRouter, Switch, Route, withRouter } from "react-router-dom";
import { SettingsPanel } from "../components/SettingsPanel";
import DrawerRouterContainer from "./DrawerRouterContainer";
import { JobTable } from "../components/JobTable";
import { RequestTable } from "../components/RequestTable";
import { Feedback } from "../components/Feedback";
import { logger } from "../helpers/logger";
import { ErrorsPanel } from "../components/ErrorsPanel";



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
                    <Route exact={true} path="/request" component={RequestTable} />
                </Switch>
            </DrawerRouterContainer>
        </HashRouter>
    </>
    );
};