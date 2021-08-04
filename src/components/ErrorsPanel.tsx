import React, { useReducer, useContext } from 'react';
import { Grid, GridColumn, GridToolbar } from '@progress/kendo-react-grid';

// todo - cut down css
import './Table.css';

import { logger } from "../helpers/logger";
import { useReduxContext } from "../context/Context";
import {RequestLinks} from "./RequestLinks";
import ReactJson from "react-json-view-ts";


const moduleName = 'ErrorsPanel';
let log = logger(moduleName);
log({ logType: 'LOADED' });



export const ErrorsPanel = () => {


    log({
        logType: 'INFO',
        message: 'ErrorsPanel mounted'
    });


    // @ts-ignore
    const { errors } = useReduxContext();

    log({
        logType: 'INFO',
        message: 'ErrorsPanel',
        payload: {errors}
    });


    return (
        <div className='panel'>
            <p>Error info</p>
            <Grid data={errors.items} >
                <GridColumn field="message" title="Error" />
                <GridColumn field="jobPosition" title="Position" />
            </Grid>
            <br />
            <div>
                <ReactJson src={errors} collapsed={1} collapseStringsAfterLength={120}/>
            </div>
        </div>
    );
};