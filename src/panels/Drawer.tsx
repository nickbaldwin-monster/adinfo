import React from 'react';

import { HashRouter, Switch, Route, withRouter } from "react-router-dom";
import { SettingsPanel } from "../components/SettingsPanel";
import DrawerRouterContainer from "./DrawerRouterContainer";
import { JobTable } from "../components/JobTable";
import { RequestTable } from "../components/RequestTable";
import { JsonTree } from "../components/JsonTree";
import { logger } from "../helpers/logger";



const moduleName = 'Drawer';
let log = logger(moduleName);
log({ logType: 'LOADED' });


export const Drawer = () => {

    return (
    <>
        <HashRouter>
            <DrawerRouterContainer>
                <Switch>
                    <Route exact={true} path="/" component={JobTable}/>
                    <Route exact={true} path="/request" component={RequestTable}/>
                    <Route exact={true} path="/json" component={JsonTree}/>
                    <Route exact={true} path="/settings" component={SettingsPanel}/>
                </Switch>
            </DrawerRouterContainer>
        </HashRouter>
    </>
    );
};