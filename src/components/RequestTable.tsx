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

    log({logType: 'INFO', message: 'RequestTable mounted'});

    // @ts-ignore
    const { loading, request } = useReduxContext();
    log({logType: 'INFO', message: 'RequestTable', payload: {request}});

    return (
        <div>
            <Grid data={request} >
                <GridColumn field="key" title="key" />
                <GridColumn field="value" title="value" />
            </Grid>
            <RequestLinks jobId={'1'} toTs={1} fromTs={1} />
        </div>
    );
};