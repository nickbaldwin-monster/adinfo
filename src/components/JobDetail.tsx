import * as React from "react";

import ReactJson from "react-json-view-ts";

import { DisplayJob } from "../types/DisplayJob";
import { JobLinks } from "./JobLinks";



interface DataProps {
    dataItem: DisplayJob;
}

export const JobDetail = (props: DataProps) => {
    const dataItem = props.dataItem;
    let isNext = props.dataItem?.ingestionMethod === 'JPW';

    return (
        <section>

            <JobLinks
                jobId={dataItem.jobId}
                accountId={undefined}
                seoJobId={dataItem.seoJobId}
                nowId={dataItem.nowId}
                url={dataItem.url}
                isNext={isNext}
            />

            {dataItem.jobId && (
                <p>
                    <strong>.NEXT jobId:</strong> {dataItem.jobId || 'N/A'}
                </p>
            )}
            {dataItem.nowId && (
                <p>
                    <strong>.NOW jobId:</strong> {dataItem.nowId || 'N/A'}
                </p>
            )}

            <ReactJson
                src={dataItem.data}
                collapsed={0}
                collapseStringsAfterLength={120}
            />

        </section>
    );
};