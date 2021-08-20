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
            <h4>Error info</h4>
            <p>As a rule, all ads should be displayed before organic results. Currently there can be up to 50 ads displayed within the combined results.</p>
            <p>Ads can be distinguished by the presence of an AdProvider value - an organic result will not have a value in that field.</p>
            <p>Any organic results which are displayed before ads will be considered as an error, but need to be analysed further.</p>
            <Grid data={errors.items} >
                <GridColumn field="message" title="Error" />
                <GridColumn field="jobPosition" title="Position" />
            </Grid>
            <br />
            <div>
                <ReactJson src={errors} collapsed={0} collapseStringsAfterLength={120}/>
            </div>
        </div>
    );
};