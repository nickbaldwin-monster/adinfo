import React, { useReducer, useContext } from 'react';
import ReactJson from 'react-json-view-ts';

// todo - cut down css
import './Table.css';

import { logger } from "../helpers/logger";
import { useReduxContext } from "../context/Context";



const moduleName = 'Info';
let log = logger(moduleName);
log({ logType: 'LOADED' });



export const Info = () => {

    log({
        logType: 'INFO',
        message: 'Info mounted'
    });

    // @ts-ignore
    const { loading } = useReduxContext();

    log({
        logType: 'INFO',
        message: 'Info',
    });

    // @ts-ignore
    return (
        <div className='panel'>
            <p>Info</p>
        </div>
    );
};