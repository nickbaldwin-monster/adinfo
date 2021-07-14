import React, { useReducer, useContext } from 'react';
import * as ReactDOM from "react-dom";
import {HashRouter, Switch, Route, withRouter} from "react-router-dom";
import { Test } from "../components/Test";

import DrawerRouterContainer from "./DrawerRouterContainer";
import { JobTable } from "../components/JobTable";
import { RequestTable } from "../components/RequestTable";
import {transformJobs} from "../helpers/transformJobs";
import {transformRequest} from "../helpers/transformRequest";




import { State } from '../content';
import { useReduxContext } from "../context/Context";
import {logger} from "../helpers/logger";


const moduleName = 'Drawer';
let log = logger(moduleName);
log({ logType: 'LOADED' });


export const Drawer = () => {

    // todo - remove - TEST
    // @ts-ignore
    // const { salad, setSalad } = useContext(State);
    // console.log('salad in draw: ', salad, setSalad);




    // const { request } = useContext(useReduxContext);
    // console.log('DRAWER: request: ' + request);

     //const {redux, request, dog, loading} = useContext(useReduxContext);

   // log({ logType: 'INFO', message: 'using context in drawer', payload: {redux, request, dog, loading} });








    window.addEventListener("message", function (e) {
        if (e.data?.messageType === 'JOB_STATE') {
            console.log('window event in Drawer')
        }
    });


    // @ts-ignore
    window.onbeforeunload = (event) => {
        const e = event || window.event;
        // Cancel the event
        console.log('adinfo ', );

        //window.history.pushState({}, '', '/dummy-page')
    };


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