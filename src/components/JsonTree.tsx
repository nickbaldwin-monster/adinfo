import React, { useReducer, useContext } from 'react';
import ReactJson from 'react-json-view-ts';

// todo - cut down css
import './Table.css';

import { logger } from "../helpers/logger";
import { useReduxContext } from "../context/Context";



const moduleName = 'JsonTree';
let log = logger(moduleName);
log({ logType: 'LOADED' });



export const JsonTree = () => {

    log({logType: 'INFO', message: 'JsonTree mounted'});

    // @ts-ignore
    const { loading, redux } = useReduxContext();
    log({logType: 'INFO', message: 'JsonTree', payload: {redux}});

    return (
        <div>
            <ReactJson src={redux} collapsed={1} collapseStringsAfterLength={120}/>
        </div>
    );
};