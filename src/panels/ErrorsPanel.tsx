import React from 'react';
import { Grid, GridColumn } from '@progress/kendo-react-grid';

import { logger } from "../helpers/logger";
import { useReduxContext } from "../context/Context";
import ReactJson from "react-json-view-ts";
import { Panel } from "./Panel";


const moduleName = 'ErrorsPanel';
let log = logger(moduleName);



export const ErrorsPanel = () => {

    // @ts-ignore
    const { errors } = useReduxContext();

    log({
        logType: 'INFO',
        message: 'ErrorsPanel',
        payload: { errors }
    });


    return (
        <Panel>
            <div className="scrollInPanel">
                <h4>Error info</h4>
                <p>Currently errors are not being determined.</p>
                <br />
                <p>As a rule, all ads should be displayed before organic results. Currently there can be up to 50 ads displayed within the combined results.</p>
                <br />
                <p>Ads can be distinguished by the presence of an AdProvider value - an organic result will not have a value in that field.</p>
                <br />
                <p>Any organic results which are displayed before ads will be considered as an error, but need to be analysed further.</p>
                <br />

                <Grid data={errors.items}>
                    <GridColumn field="message" title="Error" />
                    <GridColumn field="jobPosition" title="Position" />
                </Grid>
                <br />
                <div>
                    <ReactJson src={errors} collapsed={0} collapseStringsAfterLength={120} />
                </div>
            </div>
        </Panel>
    );
};