import React, { useReducer, useContext } from 'react';

import { Tooltip } from "@progress/kendo-react-tooltip";
import { logger } from "../helpers/logger";
import { useReduxContext } from "../context/Context";

import { process } from '@progress/kendo-data-query';
import { Grid, GridColumn, getSelectedState, GridToolbar } from '@progress/kendo-react-grid';
import { orderBy } from "@progress/kendo-data-query";
import { getter } from "@progress/kendo-react-common";
import { ExcelExport } from "@progress/kendo-react-excel-export";
import { saveAs, encodeBase64 } from '@progress/kendo-file-saver';
import { JobDetail } from './JobDetail';
import { HandleComponent, Resizable } from "re-resizable";

import { DragHandle } from "../elements/DragHandle";

// original css - '@progress/kendo-theme-default/dist/all.css';
// todo - cut down css
import './Table.css';
import {Popup} from "@progress/kendo-react-popup";
import {MessageType} from "../types";



const DATA_ITEM_KEY = "jobId";
const SELECTED_FIELD = "selected";
const idGetter = getter(DATA_ITEM_KEY);
const initialSort = [ {field: "position", dir: "asc"} ];


const moduleName = 'JobTable';
let log = logger(moduleName);
log({ logType: 'LOADED' });






/*
<th aria-sort="ascending" aria-colindex="3" aria-selected="false" colSpan="1" rowSpan="1"
    className="k-header k-grid-header-sticky k-sorted" role="columnheader" style="left: 30px; right: 200px;">
    <span className="k-link">
        Pos
        <span aria-label="Sortable" className="k-icon k-i-sort-asc-sm">
        </span>
    </span>
</th>

<th aria-sort="descending" aria-colindex="3" aria-selected="false" colspan="1" rowspan="1"
    class="k-header k-grid-header-sticky k-sorted" role="columnheader" style="left: 30px; right: 200px;">
    <span class="k-link">
        Pos
        <span aria-label="Sortable" class="k-icon k-i-sort-desc-sm">
        </span>
    </span>
</th>


<th aria-sort="none" aria-colindex="13" aria-selected="false" colspan="1" rowspan="1"
    class="k-header " role="columnheader">
    <span class="k-link">
        MescoId
        <span aria-label="Sortable">
        </span>
    </span>
</th>
 */

const linkedCell = (props: any) => {
    return (
        <td title={props.dataItem.adProvider} className={props.className} >
            <a href={`https://google.com/search?q=${props.dataItem.company}`} target='_blank' style={{fontSize: '12px', textDecorationLine: 'underline'}}>
                {props.dataItem.company}
            </a>
        </td>
    );
};

const cell = (props: any) => {
    /*
    props = {
        "dataItem": {},
        "field": "adProvider",
        "className": "k-grid-content-sticky",
        "columnIndex": 3,
        "columnsCount": 17,
        "rowType": "data",
        "level": 0,
        "dataIndex": 5,
        "style": {},
        "ariaColumnIndex": 4,
        "isSelected": false
    }
     */

    return (
        <td title={props.dataItem[props.field]} className={props.className} style={props.style}>
            {props.dataItem[props.field]}
        </td>
    );
};

const handleColumnReorder = (event: any) => {

   // todo - persist change in order
    console.log('handleColumnReorder', event);
}

export const JobTable = () => {



    const headerCell = (props: any) => {

        const anchor = React.useRef();
        const [show, setShow] = React.useState(false);
        const onClick = () => {
            setShow(!show);
        };

        if (props.title === 'Ad Provider') {


            // @ts-ignore
            return (
                <div>
                <a className="k-link" onClick={props.onClick}>
            <span title={props.title}>
                {props.title}

                {props.children}
            </span>

                </a>

                    {/* @ts-ignore */}
                    <span onClick={onClick} ref={anchor} className="k-icon k-i-information" style={{margin: '0 0 0 15px'}}></span>




                    <Popup
                        anchor={anchor.current}
                        show={show}
                        className={"wrapper"}
                        popupClass={"inner-wrapper"}
                        style={{width: "200px"}}
                    >
                        <p>A value in this field indicates the result is an ad.</p>
                        <p>There are 3 possible values here: 'GCTS_ADQUERY' and 'ADZERK' describe how the ad was selected by the AdTech platform. An empty value means that the job is displayed as an organic result.</p>
                    </Popup>

                </div>
            );
        }
        return (
            <a className="k-link" onClick={props.onClick}>
            <span title={props.title}>{props.title}
                {props.children}
            </span>
            </a>
        );
    };










    // @ts-ignore
    const { loading, jobs, setJobs, settings, numberResults, errors, hoverResult, setHoverResult }
        = useReduxContext();
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

            setHoverResult(-1);


            // todo - in progress
            // note: this does not get called upon selection changed by hover
            // console.log('selection has changed to: ', newSelectedState);

            // todo - deal with errors, unselections etc
            let id = Object.keys(newSelectedState)[0];
            let isSelect = newSelectedState[id];
            // console.log('item selected: ', isSelect);


            if (id && isSelect) {

                let position = -1;
                for (let i = 0; i < jobs.length; i++) {
                    if (jobs[i].jobId === id) {
                        position = jobs[i].position;
                        break;
                    }
                }

                if (position !== -1) {
                    console.log("position", position);

                    // todo - need to actually save this?!
                    // todo - handle message in content!
                    window.postMessage({
                        type: 'JOB_SELECTED',
                        payload: position - 1,
                        source: 'JobTable'
                    }, "*");
                }
            }
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
        // todo - CHECK!!!!!!!!!
        setJobs(newData);
    };











        React.useEffect(() => {

            log({
                logType: 'INFO',
                functionName: 'useEffect',
                message: 'executed'
            });

            // console.log('Grid useEffect');
            // console.log('hoverResult', hoverResult);
            // console.log('selectedState', selectedState);


            if (hoverResult !== -1) {
                // console.log(jobs);
                let job = jobs[hoverResult - 1];
                // console.log(job.position);
                let jobId = job.jobId;
                setSelectedState({[jobId]: true});
                // console.log(selectedState);

                let parent = document.querySelector('.k-grid-content.k-virtual-content');
                let row = document.querySelector(`[data-grid-row-index="${hoverResult - 1}"]`);

                // @ts-ignore
                let parentRectangle = parent.getBoundingClientRect();
                let parentViewableArea = {
                    // @ts-ignore
                    height: parent.clientHeight,
                    // @ts-ignore
                    width: parent.clientWidth
                };

                // @ts-ignore
                let childRectangle = row.getBoundingClientRect();
                let isViewable = (childRectangle.top >= parentRectangle.top)
                    && (childRectangle.bottom <= parentRectangle.top + parentViewableArea.height);
                if (!isViewable) {
                    const scrollTop = childRectangle.top - parentRectangle.top;
                    const scrollBottom = childRectangle.bottom - parentRectangle.bottom;
                    if (Math.abs(scrollTop) < Math.abs(scrollBottom)) {
                        // @ts-ignore
                        parent.scrollTop += scrollTop;
                    }
                    else {
                        // @ts-ignore
                        parent.scrollTop += scrollBottom;
                    }
                }
            }



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
        }, [hoverResult]);




    return (
        <Resizable
            defaultSize={{ width: '600px', height: '100%' }}
            enable={{ top:false, right:false, bottom:false, left:true,
                topRight:false, bottomRight:false, bottomLeft:false, topLeft:false }}
            minWidth='500px'
            handleComponent={{left: DragHandle}}

        >
        <div className='jobTable'>

            <ExcelExport data={jobs} ref={_export}>

                <Grid
                    className='gridJobs'
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
                        enabled: false,
                        drag: false,
                        cell: false,
                        mode: "single",
                    }}
                    onSelectionChange={onSelectionChange}
                    onHeaderSelectionChange={onHeaderSelectionChange}
                    fixedScroll={true}

                    // style={{ height: '100%', overflow: 'auto', paddingBottom: '10px' }}
                    // style={{ height: '100vh - 145px'}}

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

                    <GridColumn field="position" title="Position" width="50px" locked={true} reorderable={false} headerCell={headerCell} orderIndex={0 }/>
                    {settings.company && <GridColumn field="company" title="Company" width="100px" locked={true} headerCell={headerCell} reorderable={false}  orderIndex={0 }/>}
                    {settings.adProvider && <GridColumn field="adProvider" title="Ad Provider" width="120px" locked={true} headerCell={headerCell} cell={cell} reorderable={false}  orderIndex={0 } headerClassName='gridBorder' className='gridBorder'  />}
                    {settings.title && <GridColumn field="title" title="Title" width="150px" reorderable={true} headerCell={headerCell} />}
                    {settings.location && <GridColumn field="location" title="Location" width="120px" reorderable={true} headerCell={headerCell} />}
                    {settings.nowId && <GridColumn field="nowId" title="Now ID" width="80px" headerCell={headerCell} />}
                    {settings.jobId && <GridColumn field="jobId" title="Job ID" width="80px" headerCell={headerCell} />}
                    {settings.template && <GridColumn field="template" title="Template" width="80px" headerCell={headerCell}/>}
                    {settings.xCode && <GridColumn field="xCode" title="xcode" width="80px" headerCell={headerCell} />}
                    {settings.applyType && <GridColumn field="applyType" title="Apply Type" width="70px" headerCell={headerCell} />}
                    {settings.formattedDate && <GridColumn field="formattedDate" title="Date" width="70px" headerCell={headerCell} />}
                    {settings.mesco && <GridColumn field="mesco" title="Mesco" width="100px" headerCell={headerCell} />}
                    {settings.provider && <GridColumn field="provider" title="Provider" width="70px" headerCell={headerCell} />}
                    {settings.providerCode && <GridColumn field="providerCode" title="Provider Code" width="80px" headerCell={headerCell} />}
                    {settings.dateRecency && <GridColumn field="dateRecency" title="Recency" width="80px" reorderable={true} headerCell={headerCell} />}
                    {settings.ingestionMethod && <GridColumn field="ingestionMethod" title="Ingestion" width="70px" headerCell={headerCell} />}
                    {settings.pricingType && <GridColumn field="pricingType" title="Pricing Type" width="40px" headerCell={headerCell} />}
                    {settings.seoJobId && <GridColumn field="seoJobId" title="SEO Job ID" width="60px" headerCell={headerCell} />}
                    {settings.refCode && <GridColumn field="refCode" title="Ref Code" width="60px" headerCell={headerCell} />}
                    {settings.validThrough && <GridColumn field="validThrough" title="Valid Through" width="80px" headerCell={headerCell} />}
                    {settings.validThroughGoogle && <GridColumn field="validThroughGoogle" title="Valid Google" width="80px" headerCell={headerCell} />}
                    {false && <GridColumn field="remote" title="Remote?" width="50px" headerCell={headerCell} />}



                </Grid>

            </ExcelExport>

        </div>
        </Resizable>
    );
};

// todo - links in table
// {settings.nowId && <GridColumn field="company" title="google" width="80px" cell={linkedCell}  />}

