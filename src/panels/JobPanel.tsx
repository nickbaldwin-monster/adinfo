import React, {useReducer, useContext, useState, PropsWithChildren} from 'react';

import {
    Grid,
    GridColumn,
    getSelectedState,
    GridToolbar,
    GridCellProps,
    GridNoRecords
} from '@progress/kendo-react-grid';
import { orderBy } from "@progress/kendo-data-query";
import { getter } from "@progress/kendo-react-common";
import { ExcelExport } from "@progress/kendo-react-excel-export";
import { saveAs, encodeBase64 } from '@progress/kendo-file-saver';
import { Button } from "@progress/kendo-react-buttons";
import { Popup } from "@progress/kendo-react-popup";

import { logger } from "../helpers/logger";
import { useReduxContext } from "../context/Context";
import { JobDetail } from '../components/JobDetail';

import { getNamesOfJobFields, DataModel } from "../model/DataModel";
import { DevInfo } from "../components/DevInfo";
import { Info } from "../components/Info";
import { Panel } from './Panel';

// todo - cut down css
import './Table.css';

const DATA_ITEM_KEY = "jobId";
const SELECTED_FIELD = "selected";
const idGetter = getter(DATA_ITEM_KEY);
const initialSort = [ {field: "position", dir: "asc"} ];


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


/*
props = {
    "id": "123...",
    "colSpan": 1;
    "dataItem": { ... },
    "field": "adProvider",
    "className": "k-grid-content-sticky",
    "columnIndex": 3,
    "columnsCount": 17,
    "rowType": "data",
    "level": 0,
    "dataIndex": 5,
    "style": { ... },
    "ariaColumnIndex": 4,
    "isSelected": false
}
 */

const truncatedDescriptionCell = (props: PropsWithChildren<GridCellProps>) => {
    let desc = props.dataItem.description?.substring(0, 250) + "...";
    return (
        <td colSpan={props.colSpan} className="" role="gridcell" aria-colindex={props.ariaColumnIndex}
            aria-selected={props.isSelected} data-grid-col-index={props.columnIndex}>
            {desc}
        </td>
    );
};




const handleColumnReorder = (event: any) => {

   // todo - persist change in order
    console.log('handleColumnReorder', event);
}

export const JobPanel = () => {



    const headerCell = (props: any) => {

        const anchor = React.useRef();
        const [show, setShow] = React.useState(false);
        const onClick = () => {
            setShow(!show);
        };

        let message;
        if (props.title === 'Ad Provider') {
            message = (
                <>
                    <p>A value in this field indicates the result is an ad.</p>
                    <p>There are 3 possible values here: 'GCTS_ADQUERY' and 'ADZERK' describe how the ad was selected by the AdTech platform. An empty value means that the job is displayed as an organic result.</p>
                </>
            );
        }
        if (props.title === 'AdRank') {
            message = (
                <>
                    <p>Ad order is determined by the auction engine.</p>
                    <p>This should generally be the same as position, but some ads may be skipped resulting in differences.</p>
                </>
            );
        }
        if (props.title === 'Remote?') {
            message = (
                <>
                    <p>This field relies on a specific job property provided by the employer. In many cases this will not be provided for remote (or other jobs) and may only be described in the title or description.</p>
                </>
            );
        }
        if (!message) {
            return (
                <a className="k-link" onClick={props.onClick}>
                    <span title={props.title}>{props.title}
                        {props.children}
                    </span>
                </a>
            );
        }

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
                <span ref={anchor}
                    onClick={onClick}
                    className="k-icon k-i-information"
                    style={{ margin: '0 0 0 5px' }}
                />

                <Popup
                    anchor={anchor.current}
                    show={show}
                    className={"wrapper"}
                    popupClass={"inner-wrapper"}
                    style={{width: "200px"}}
                >
                    {message}
                </Popup>

            </div>
        );

    };










    // @ts-ignore
    const { auth, loading, displayDevInfo, searchId, auctionBids, decisionId, jobs, setJobs, settings, numberResults, errors, hoverResult, setHoverResult }
        = useReduxContext();

    const _export = React.useRef(null);

    const excelExport = () => {
        if (_export.current !== null) {
            // @ts-ignore
            _export.current.save();
        }
        // @ts-ignore
        window._export = _export.current;
        console.log(_export.current);

        // @ts-ignore
        console.log(_export.current.getExportData());
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

            // todo - deal with errors, unselections etc
            let id = Object.keys(newSelectedState)[0];
            let isSelect = newSelectedState[id];

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
                        payload: position,
                        source: 'JobPanel'
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
        setJobs(newData);
    };





    React.useEffect(() => {
        if (hoverResult !== -1 && jobs && jobs.length > 0) {
            let job = jobs[hoverResult];
            let jobId = job.jobId;
            setSelectedState({[jobId]: true});

            let parent = document.querySelector('.k-grid-content.k-virtual-content');
            let row = document.querySelector(`[data-grid-row-index="${hoverResult}"]`);
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
    }, [hoverResult]);


    // alternative approach - scroll results so selected item is displayed as top item
    // at least, until reach last few results
    /*
    React.useEffect(() => {
        if (hoverResult !== -1 && jobs?.length > 0) {
            let job = jobs[hoverResult];
            let jobId = job.jobId;
            setSelectedState({[jobId]: true});
            let row = document.querySelector(`[data-grid-row-index="${hoverResult}"]`);
            if (row) {
                row.scrollIntoView();
            }
        }
    }, [hoverResult]);


    */

    let names = getNamesOfJobFields();
    const displayVisibleColumns = () => {
        if (!settings?.dataOrder || !settings?.dataSettings) {
            return (<div>nothing to see</div>);
        }
        return names.map((name, i) => {

            // todo - just filter changes in onColumnReorder?
            // todo -figure out resizing fixed items
            // todo - conditionally add just orderindex

            if (!name || !settings.dataSettings[name]?.visible) {
                return null;
            }
            if (DataModel[name].orderIndex) {
                return (
                     <GridColumn
                        field={name} title={DataModel[name].title || ""}
                        width={DataModel[name].width || "200px"}
                        locked={DataModel[name].locked}
                        reorderable={DataModel[name].reorderable}
                        headerCell={headerCell}
                        orderIndex={DataModel[name].orderIndex}
                        headerClassName={DataModel[name].headerClassName}
                        className={DataModel[name].className}
                     />
                );
            }
            else if (DataModel[name].title === 'Description') {
                return (
                    <GridColumn
                        field={name} title={DataModel[name].title || ""}
                        width={DataModel[name].width || "200px"}
                        locked={DataModel[name].locked}
                        reorderable={DataModel[name].reorderable}
                        headerCell={headerCell}
                        headerClassName={DataModel[name].headerClassName}
                        className={DataModel[name].className}
                        cell={truncatedDescriptionCell}
                    />
                );
            }
            else {
                return (
                    <GridColumn
                        field={name} title={DataModel[name].title || ""}
                        width={DataModel[name].width || "200px"}
                        locked={DataModel[name].locked}
                        reorderable={DataModel[name].reorderable}
                        headerCell={headerCell}
                        headerClassName={DataModel[name].headerClassName}
                        className={DataModel[name].className}
                    />
                );
            }
        });
    }


    // todo - loading...

    return (
        <Panel enabled={true}>
            <div className='jobTable'>
                <ExcelExport data={jobs} ref={_export}>

                    <Grid
                        className='gridJobs'
                        reorderable={true}
                        resizable={true}
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
                            <div style={{display: "flex", gap: "8px"}}>
                                <Button
                                    title="Export Excel"
                                    className="k-button k-primary"
                                    onClick={excelExport}
                                >
                                    Export to Excel
                                </Button>
                                <Button
                                    title="Export JSON"
                                    className="k-button k-primary"
                                    onClick={saveJson}
                                >
                                    Export to JSON
                                </Button>
                            </div>
                            <Info numberResults={numberResults} errors={errors} auctionBids={auctionBids} />
                            {displayDevInfo && <DevInfo searchId={searchId} decisionId={decisionId} />}
                        </GridToolbar>

                        <GridNoRecords>
                            There are no results matching your search.
                        </GridNoRecords>

                        <GridColumn
                            field={SELECTED_FIELD}
                            width="30px"
                            headerSelectionValue={
                                // @ts-ignore
                                jobs.findIndex((item) => !selectedState[idGetter(item)]) === -1
                            }
                            locked={true}
                        />
                        {displayVisibleColumns()}
                    </Grid>

                </ExcelExport>
            </div>
        </Panel>
    );
};

// todo - links in table
// {settings.nowId && <GridColumn field="company" title="google" width="80px" cell={linkedCell}  />}

