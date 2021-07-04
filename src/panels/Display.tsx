import * as React from "react";

import '@progress/kendo-theme-default/dist/all.css';
import { process } from '@progress/kendo-data-query';
import { Grid, GridColumn } from '@progress/kendo-react-grid';
import { orderBy } from "@progress/kendo-data-query";

const initialSort = [
    {
        field: "position",
        dir: "asc",
    },
];

// import "./Settings.css";
import { loadSettings, saveSettings } from "../helpers/state";
import {MessageType} from "../types";
import {logger} from "../helpers/logger";
import {transformJobs} from "../helpers/transformJobs";

const moduleName = 'display';
let log = logger(moduleName);
log({ logType: 'LOADED' });

interface DataProps {
    dataItem: {
        position: number;
        title: string;
        company: string;
        jobId: string;
        location: string;
        adProvider: string;
        mesco: string;
        ingestionMethod: string; // IngestionMethod
        pricingType: string; // PricingType;
        formattedDate: string;
        dateRecency: string;
        provider: string;
        providerCode: string;
        applyType: string;
    };
}

const DetailComponent = (props: DataProps) => {
    const dataItem = props.dataItem;
    return (
        <section>
            <p>
                <strong>Mesco:</strong> {dataItem.mesco} units
            </p>
            <p>
                <strong>providerCode:</strong> {dataItem.providerCode} units
            </p>

        </section>
    );
};

export const Display = () => {

    const [sort, setSort] = React.useState(initialSort);
        const [jobs, setJobs] = React.useState([]);


    const expandChange = (event: any) => {
        let newData = jobs.map((item) => {

            // @ts-ignore
            if (item.jobId === event.dataItem.jobId) {
                // @ts-ignore
                item.expanded = !event.dataItem.expanded;
            }

            return item;
        });
        setJobs(newData);
    };

        React.useEffect(() => {
            log({ logType: 'INFO', functionName: 'useEffect', message: 'executed' });

            /*
            chrome.runtime.onMessage.addListener((message: MessageType) => {
                log({ logType: 'MESSAGE_RECEIVED', functionName: 'N/A', payload: message });
                if (message.type === "JOB_STATE") {
                    console.log('payload: ', message.payload);
                    // @ts-ignore
                    setJobs(message.payload);
                }
            });

             */

            window.addEventListener("message", function (e) {


                if (e.data?.messageType === 'JOB_STATE') {
                    let newState = e.data.payload;
                    let json = JSON.parse(newState);
                    const {jobsList} = json;
                    log({logType: 'INFO', moduleName, message: 'job list updated', payload: json});
                    log({logType: 'INFO', moduleName, message: 'job list updated', payload: jobsList});

                    let jobs = transformJobs(jobsList);
                    console.log('inside display: ', jobs);

                    // @ts-ignore
                    setJobs(jobs);

                }
                /*
                if (message.type === "JOB_STATE") {
                    console.log('payload: ', message.payload);
                    // @ts-ignore
                    setJobs(message.payload);
                }
                */


            });



        }, []);






    return (
        <div>
            <p>hello</p>
            <Grid
                // @ts-ignore
                data={orderBy(jobs, sort)}
                sortable={true}
                // @ts-ignore
                sort={sort}
                onSortChange={(e) => {
                    // @ts-ignore
                    setSort(e.sort);
                }}
                detail={DetailComponent}

                expandField="expanded"
                onExpandChange={expandChange}
            >

                <GridColumn field="position" title="pos" />
                <GridColumn field="company" title="company" />
                <GridColumn field="title" title="title" />
                <GridColumn field="location" title="location" />
                <GridColumn field="ingestionMethod" title="ingestion" />
                <GridColumn field="pricingType" title="type" />
                <GridColumn field="adProvider" title="adProvider" />
                <GridColumn field="mesco" title="mesco" />
                <GridColumn field="dateRecency" title="recency" />
                <GridColumn field="formattedDate" title="date" />
                <GridColumn field="provider" title="provider" />
                <GridColumn field="applyType" title="apply" />



            </Grid>
        </div>
    );
};


