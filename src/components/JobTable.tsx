import React, { useReducer, useContext } from 'react';

import { logger } from "../helpers/logger";
import { useReduxContext } from "../context/Context";

import { process } from '@progress/kendo-data-query';
import { Grid, GridColumn, getSelectedState, GridToolbar } from '@progress/kendo-react-grid';
import { orderBy } from "@progress/kendo-data-query";
import { getter } from "@progress/kendo-react-common";
import { ExcelExport } from "@progress/kendo-react-excel-export";
import { saveAs, encodeBase64 } from '@progress/kendo-file-saver';
import { JobDetail } from './JobDetail';

// original css - '@progress/kendo-theme-default/dist/all.css';
// todo - cut down css
import './Table.css';



const DATA_ITEM_KEY = "jobId";
const SELECTED_FIELD = "selected";
const idGetter = getter(DATA_ITEM_KEY);
const initialSort = [ {field: "position", dir: "asc"} ];


const moduleName = 'JobTable';
let log = logger(moduleName);
log({ logType: 'LOADED' });



/*
const cellWithTitle = props => {
    const examplePrice = props.dataItem.UnitPrice < 15;
    const icon = examplePrice ? <span className="k-icon k-i-sort-desc-sm" /> : <span className="k-icon k-i-sort-asc-sm" />;
    const style = {
        backgroundColor: examplePrice ? "rgb(243, 23, 0, 0.32)" : "rgb(55, 180, 0,0.32)"
    };
    const field = props.field || '';
    return <td style={style} title={props.dataItem.UnitPrice}>
        {props.dataItem[field]} {icon}
    </td>;
};

 */


const cell = (props: any) => {
    console.log('props', props);
    return <td title={props.dataItem.adProvider} className={props.className} style={props.style}>
        {props.dataItem.adProvider}
    </td>;
};

const handleColumnReorder = (event: any) => {

    // nativeEvent: PointerEvent = {
    //     columns:[], nativeEvent: {}target: {}
    // }


    console.log('handleColumnReorder', event);


}

export const JobTable = () => {
    // @ts-ignore
    const { loading, jobs, setJobs, settings, numberResults, errors } = useReduxContext();
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

        // todo
        //console.log(keys);
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

            log({
                logType: 'INFO',
                functionName: 'useEffect',
                message: 'executed'
            });

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

                    reorderable={true}
                    onColumnReorder={handleColumnReorder}
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
                    fixedScroll={true}

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

                        {numberResults} results | {errors.message}

                    </GridToolbar>

                    <GridColumn
                        field={SELECTED_FIELD}
                        width="30px"
                        headerSelectionValue={
                            // @ts-ignore
                            jobs.findIndex((item) => !selectedState[idGetter(item)]) === -1
                        }
                        locked={true}
                    />

                    <GridColumn field="position" title="Pos" width="50px" locked={true} reorderable={false} orderIndex={1} />
                    {settings.adProvider && <GridColumn field="adProvider" title="AdProvider" width="100px" locked={true} cell={cell} reorderable={false} orderIndex={2} />}
                    {settings.company && <GridColumn field="company" title="Company" width="100px" locked={true} className='gridBorder' headerClassName='gridBorder' reorderable={false} orderIndex={3} />}
                    {settings.title && <GridColumn field="title" title="Title" width="150px" reorderable={true} />}
                    {settings.location && <GridColumn field="location" title="Location" width="120px" reorderable={true} />}
                    {settings.dateRecency && <GridColumn field="dateRecency" title="Recency" width="80px" reorderable={true} />}
                    {settings.xCode && <GridColumn field="xCode" title="xCode" width="80px" />}
                    {settings.template && <GridColumn field="template" title="templateId" width="80px" />}
                    {settings.pricingType && <GridColumn field="pricingType" title="$Type" width="20px" />}
                    {settings.formattedDate && <GridColumn field="formattedDate" title="Date" width="70px" />}
                    {settings.mesco && <GridColumn field="mesco" title="MescoId" width="100px" />}
                    {settings.jobId && <GridColumn field="jobId" title="jobId" width="80px" />}
                    {settings.provider && <GridColumn field="provider" title="Provider" width="70px" />}
                    {settings.providerCode && <GridColumn field="providerCode" title="Provider Code" width="80px" />}
                    {settings.ingestionMethod && <GridColumn field="ingestionMethod" title="Ingestion" width="70px" />}
                    {settings.applyType && <GridColumn field="applyType" title="Apply" width="70px" />}
                    {settings.nowId && <GridColumn field="nowId" title="nowId" width="80px" />}
                </Grid>
            </ExcelExport>
        </>
    );
};


