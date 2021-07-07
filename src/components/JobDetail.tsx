import * as React from "react";
import ReactJson from "react-json-view-ts";

import { DisplayJob } from "../types/DisplayJob";



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

            <ReactJson src={dataItem.data} collapsed={1} collapseStringsAfterLength={120}/>

        </section>
    );
};