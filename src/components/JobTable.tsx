import React, { useReducer, useContext } from 'react';



// todo - cut down css
// original css - '@progress/kendo-theme-default/dist/all.css';
import './Table.css';

import { process } from '@progress/kendo-data-query';
import { Grid, GridColumn, getSelectedState, GridToolbar } from '@progress/kendo-react-grid';
import { orderBy } from "@progress/kendo-data-query";
import { getter } from "@progress/kendo-react-common";
import { ExcelExport } from "@progress/kendo-react-excel-export";
import { saveAs, encodeBase64 } from '@progress/kendo-file-saver';
import { JobDetail } from './JobDetail';
import { logger } from "../helpers/logger";
import { useReduxContext } from "../context/Context";



const DATA_ITEM_KEY = "jobId";
const SELECTED_FIELD = "selected";
const idGetter = getter(DATA_ITEM_KEY);
const initialSort = [ {field: "position", dir: "asc"} ];

const moduleName = 'JobTable';
let log = logger(moduleName);
log({ logType: 'LOADED' });



export const JobTable = () => {
    // @ts-ignore
    const { jobs, setJobs } = useReduxContext();
    const _export = React.useRef(null);

    const excelExport = () => {
        if (_export.current !== null) {
            // @ts-ignore
            _export.current.save();
        }
    };

    const [sort, setSort] = React.useState(initialSort);
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
        let newData = jobs.map((item: any) => {
            // @ts-ignore
            if (item.jobId === event.dataItem.jobId) {
                // @ts-ignore
                item.expanded = !event.dataItem.expanded;
            }
            return item;
        });


        // todo
        // todo
        // todo
        // todo
        // todo
        // todo
        // todo - CHECK!!!!!!!!!
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
        }, []);


    // @ts-ignore
    return (
        <>
            <ExcelExport data={jobs} ref={_export}>
            <Grid
               // data={orderBy(jobs, sort)}
                data={orderBy(jobs.map((item: any) => ({
                    // @ts-ignore
                    ...item,
                    // @ts-ignore
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


                // style={{ height: '100%', overflow: 'auto', paddingBottom: '10px' }}

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

        </>
    );
};

