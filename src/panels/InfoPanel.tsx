import React from 'react';
import { Grid, GridColumn, GridToolbar } from '@progress/kendo-react-grid';
import ReactJson from "react-json-view-ts";

import { useReduxContext } from "../context/Context";
import { DatadogLink } from "../components/DatadogLink";
import { Domains } from "../components/Domains";
import { Panel } from "./Panel";
import { AuthButtons } from "../components/AuthButtons";




export const InfoPanel = () => {
    // todo - persist searchContext as object too
    // @ts-ignore
    const { version, loading, rawSearchContext, searchContext, searchId, auth, name } = useReduxContext();
    let versionInfo = version ? `v${version}` : "";


    // <div className='panel'>
    return (
        <Panel>
            <div className="scrollInPanel">
                <AuthButtons auth={auth} name={name} />

                <h4>Info: {version && versionInfo}</h4>
                <p>This plugin aids the interpretation of the job search results.</p>
                <br />
                <p>Read the guide to the various data fields/functions available in this extension:&nbsp;
                    <a target="_blank" href="https://monster-next.atlassian.net/wiki/spaces/STCT/pages/2138538091/JSP+Version+guide">here</a>
                </p>
                <br />
                <p>It works on all Monster domains - see list below.</p>
                <br />
                {searchId && <DatadogLink searchId={searchId}  />}
                <br />
                <p>Request info</p>
                <Grid data={searchContext} >
                    <GridColumn field="key" title="key" />
                    <GridColumn field="value" title="value" />
                </Grid>
                <br />
                <Domains />
                <br />
                <p>Request/response data</p>
                <ReactJson src={rawSearchContext} collapsed={0} collapseStringsAfterLength={120}/>
            </div>
        </Panel>
    );
};