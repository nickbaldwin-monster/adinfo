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
            <p>
                <strong>Mesco:</strong> {dataItem.mesco || 'N/A'}
            </p>
            <p>
                <strong>providerCode:</strong> {dataItem.providerCode || 'N/A'}
            </p>
            <p>
                <strong>NEXT jobId:</strong> {dataItem.jobId || 'N/A'}
            </p>
            <p>
                <strong>SEO id:</strong> {dataItem.seoJobId || 'N/A'}
            </p>

            <JobLinks jobId={dataItem.jobId} accountId={undefined} seoJobId={dataItem.seoJobId}  />

            <ReactJson src={dataItem.data} collapsed={1} collapseStringsAfterLength={120}/>

        </section>
    );
};