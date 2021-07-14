import React, {useContext, useEffect, useState} from 'react';
import * as ReactDOM from "react-dom";



import { logger } from "../helpers/logger";
import {TabStripTab} from "@progress/kendo-react-layout";
import {useReduxContext} from "../context/Context";


const moduleName = 'Tab1';
let log = logger(moduleName);
log({ logType: 'LOADED' });


// @ts-ignore
export const Tab1 = () => {

    // @ts-ignore
    let {redux, request, dog, loading} = useReduxContext();

    log({ logType: 'INFO', message: 'context - render', payload: {redux, request, dog, loading} });


    let load = 'loading';
    if (loading === false) {
        load = 'done';
    }

    return (

            <div>
                <p> tab content</p>
                <p> tab content</p>
                <p> tab content</p><p> tab content</p>
                <p> tab content</p>
                <p> tab content</p>
                <p> tab content</p>
                <p> tab content</p>
                <p>loading:  {load}</p>


            </div>

    );
};