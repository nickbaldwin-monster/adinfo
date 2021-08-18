import * as React from "react";
import ReactJson from "react-json-view-ts";

import { DisplayJob } from "../types/DisplayJob";
import { logger } from "../helpers/logger";
import { JobLinks } from "./JobLinks";


const moduleName = 'JobDetail';
let log = logger(moduleName);
log({ logType: 'LOADED' });



interface DataProps {
    dataItem: DisplayJob;
}

export const JobDetail = (props: DataProps) => {
    const dataItem = props.dataItem;

    return (
        <section>

            <JobLinks jobId={dataItem.jobId} accountId={undefined} seoJobId={dataItem.seoJobId} nowId={dataItem.nowId} url={dataItem.url} />

            <p>
                <strong>NEXT jobId:</strong> {dataItem.jobId || 'N/A'}
            </p>
            {dataItem.nowId && <p>
                <strong>Now jobId:</strong> {dataItem.nowId || 'N/A'}
            </p>}


            <ReactJson src={dataItem.data} collapsed={0} collapseStringsAfterLength={120}/>

        </section>
    );
};