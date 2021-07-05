import * as React from "react";

import '@progress/kendo-theme-default/dist/all.css';
import { process } from '@progress/kendo-data-query';
import { Grid, GridColumn, getSelectedState, GridToolbar } from '@progress/kendo-react-grid';
import { orderBy } from "@progress/kendo-data-query";
import { getter } from "@progress/kendo-react-common";
import { ExcelExport } from "@progress/kendo-react-excel-export";

import { saveAs, encodeBase64 } from '@progress/kendo-file-saver';


const DATA_ITEM_KEY = "jobId";
const SELECTED_FIELD = "selected";
const idGetter = getter(DATA_ITEM_KEY);


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
                <strong>Mesco:</strong> {dataItem.mesco || 'N/A'}
            </p>
            <p>
                <strong>providerCode:</strong> {dataItem.providerCode || 'N/A'}
            </p>

        </section>
    );
};

export const Display = () => {

    const _export = React.useRef(null);

    const excelExport = () => {
        if (_export.current !== null) {

            // @ts-ignore
            _export.current.save();
        }
    };

    const [sort, setSort] = React.useState(initialSort);
    const [jobs, setJobs] = React.useState([]);


    const [selectedState, setSelectedState] = React.useState({});
    const onSelectionChange = React.useCallback(
        (event) => {
            const newSelectedState = getSelectedState({
                event,
                selectedState: selectedState,
                dataItemKey: DATA_ITEM_KEY,
            });
            setSelectedState(newSelectedState);
        },
        [selectedState]
    );

    const onHeaderSelectionChange = React.useCallback((event) => {
        const checkboxElement = event.syntheticEvent.target;
        const checked = checkboxElement.checked;
        const newSelectedState = {};
        event.dataItems.forEach((item: any) => {

            // @ts-ignore
            newSelectedState[idGetter(item)] = checked;
        });
        setSelectedState(newSelectedState);
    }, []);


    const saveJson = () => {
        let json = JSON.stringify(jobs);
        const dataURI = "data:text/plain;base64," + encodeBase64(json);
        saveAs(dataURI, "exportJobData.json");
    }

    const saveSelected = () => {


        console.log("selected", selectedState);
    }


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



                    const newJobs =
                        jobs.map((dataItem) =>
                            Object.assign(
                                {
                                    selected: false,
                                },
                                dataItem
                            )
                        );
                    // @ts-ignore
                    setJobs(newJobs);

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
            <ExcelExport data={jobs} ref={_export}>
            <Grid

               // data={orderBy(jobs, sort)}

                data={orderBy(jobs.map((item) => ({
                    // @ts-ignore
                    ...item,
                    [SELECTED_FIELD]: selectedState[idGetter(item)],
                    // @ts-ignore
                })), sort)}
                dataItemKey={DATA_ITEM_KEY}
                selectedField={SELECTED_FIELD}
                selectable={{
                    enabled: true,
                    drag: false,
                    cell: false,
                    mode: "multiple",
                }}
                onSelectionChange={onSelectionChange}
                onHeaderSelectionChange={onHeaderSelectionChange}




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


                <GridToolbar>
                    <button
                        title="Export Excel"
                        className="k-button k-primary"
                        onClick={excelExport}
                    >
                        Export to Excel
                    </button>

                    <button
                        title="Export JSON"
                        className="k-button k-primary"
                        onClick={saveJson}
                    >
                        Export to JSON
                    </button>

                    <button
                        title="test selected"
                        className="k-button k-primary"
                        onClick={saveSelected}
                    >
                        test selected
                    </button>

                </GridToolbar>



                <GridColumn
                    field={SELECTED_FIELD}
                    width="50px"
                    headerSelectionValue={
                        // @ts-ignore
                        jobs.findIndex((item) => !selectedState[idGetter(item)]) === -1
                    }
                />

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
            </ExcelExport>
        </div>
    );
};


