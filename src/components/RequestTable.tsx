import React, { useReducer, useContext } from 'react';
import { Grid, GridColumn, GridToolbar } from '@progress/kendo-react-grid';

// todo - cut down css
import './Table.css';

import { logger } from "../helpers/logger";
import { useReduxContext } from "../context/Context";
import {RequestLinks} from "./RequestLinks";


const moduleName = 'RequestTable';
let log = logger(moduleName);
log({ logType: 'LOADED' });



export const RequestTable = () => {
    log({
        logType: 'INFO',
        message: 'RequestTable mounted'
    });


    // @ts-ignore
    const { loading, request } = useReduxContext();

    log({
        logType: 'INFO',
        message: 'RequestTable',
        payload: {request}
    });

    let searchId;
    let isLink = false;
    if (request && request.length) {
        // @ts-ignore
        searchId = request.find((el: object) => el.key === 'searchId').value;
        isLink = true
    }
    // let toTs = Date.now() + 90000;
    let toTs = Date.now();
    let fromTs = toTs - 900000;

    return (
        <div className='panel'>
            <p>Request info</p>
            <Grid data={request} >
                <GridColumn field="key" title="key" />
                <GridColumn field="value" title="value" />
            </Grid>
            {isLink && <RequestLinks searchId={searchId} toTs={toTs} fromTs={fromTs} />}
        </div>
    );
};