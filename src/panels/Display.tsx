import * as React from "react";

import { DisplayJob } from '../types/DisplayJob';


// todo - cut down css
// import '@progress/kendo-theme-default/dist/all.css';
import './Display.css';

import { process } from '@progress/kendo-data-query';
import { Grid, GridColumn, getSelectedState, GridToolbar } from '@progress/kendo-react-grid';
import { orderBy } from "@progress/kendo-data-query";
import { getter } from "@progress/kendo-react-common";
import { ExcelExport } from "@progress/kendo-react-excel-export";
import { saveAs, encodeBase64 } from '@progress/kendo-file-saver';
import { TabStrip, TabStripTab } from "@progress/kendo-react-layout";

import ReactJson from 'react-json-view-ts';
 import { JobDetail } from '../components/JobDetail';




// import "./Settings.css";
import { loadSettings, saveSettings } from "../helpers/state";
import { MessageType } from "../types";
import { logger } from "../helpers/logger";
import { transformJobs } from "../helpers/transformJobs";
import { transformRequest } from "../helpers/transformRequest";



const DATA_ITEM_KEY = "jobId";
const SELECTED_FIELD = "selected";
const idGetter = getter(DATA_ITEM_KEY);


const initialSort = [
    {
        field: "position",
        dir: "asc",
    },
];


const moduleName = 'display';
let log = logger(moduleName);
log({ logType: 'LOADED' });




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
    const [request, setRequest] = React.useState([]);
    const [redux, setRedux] = React.useState({});


    // default tab is first - job list
    const [selectedTab, setSelectedTab] = React.useState(0);
    const handleSelectTab = (e: any) => {
        setSelectedTab(e.selected);
    };


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
        let json = JSON.stringify(jobs, null, 4);
        const dataURI = "data:text/plain;base64," + encodeBase64(json);
        saveAs(dataURI, "exportJobData.json");
    }

    const saveSelected = () => {

        let keys = Object.keys(selectedState);
        console.log(keys);
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
                    const { jobsList } = json;
                    log({logType: 'INFO', moduleName, message: 'job list updated', payload: json});
                    log({logType: 'INFO', moduleName, message: 'job list updated', payload: jobsList});

                    let jobs = transformJobs(jobsList);

                    // is this actually needed?!
                    // todo - test this out
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

                    let request = transformRequest(json);
                    if (request) {
                        let arr = [];
                        for (const [k, v] of Object.entries(request)) {
                            arr.push({key: k, value: v});
                        }
                        // @ts-ignore
                        setRequest(arr)
                    }
                    setRedux(json);
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
            <TabStrip selected={selectedTab} onSelect={handleSelectTab}>
                <TabStripTab title="Jobs">

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


                style={{ height: '100%', overflow: 'auto', paddingBottom: '10px' }}



                sortable={true}
                // @ts-ignore
                sort={sort}
                onSortChange={(e) => {
                    // @ts-ignore
                    setSort(e.sort);
                }}
                detail={JobDetail}

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
                    width="30px"
                    headerSelectionValue={
                        // @ts-ignore
                        jobs.findIndex((item) => !selectedState[idGetter(item)]) === -1
                    }
                />


                <GridColumn field="position" title="P" width="30px"/>
                <GridColumn field="company" title="Company" width="100px"/>
                <GridColumn field="title" title="Title" width="150px"/>
                <GridColumn field="location" title="Location" width="120px"/>
                <GridColumn field="ingestionMethod" title="ingestion" width="70px"/>
                <GridColumn field="pricingType" title="T" width="20px"/>
                <GridColumn field="adProvider" title="AdProvider" width="50px"/>
                <GridColumn field="mesco" title="Mesco" width="100px"/>
                <GridColumn field="dateRecency" title="Recency" width="80px"/>
                <GridColumn field="formattedDate" title="Date" width="70px"/>
                <GridColumn field="provider" title="Provider" width="70px"/>
                <GridColumn field="applyType" title="Apply" width="70px"/>
                <GridColumn field="xCode" title="xCode" width="80px"/>


            </Grid>
            </ExcelExport>
                </TabStripTab>
                <TabStripTab title="Search">
                    <Grid data={request} >
                        <GridColumn field="key" title="key" />
                        <GridColumn field="value" title="value" />
                    </Grid>

                    <ReactJson src={redux} collapsed={1} collapseStringsAfterLength={120}/>

                </TabStripTab>

            </TabStrip>
        </div>
    );
};


