import React, { useReducer, useContext } from 'react';
import ReactJson from 'react-json-view-ts';

// todo - cut down css
import './Table.css';

import { logger } from "../helpers/logger";
import { useReduxContext } from "../context/Context";
import { Resizable} from "re-resizable";


const moduleName = 'Feedback';
let log = logger(moduleName);
log({ logType: 'LOADED' });



export const Feedback = () => {

    log({
        logType: 'INFO',
        message: 'Feedback mounted'
    });

    // @ts-ignore
    const { loading } = useReduxContext();

    log({
        logType: 'INFO',
        message: 'Feedback',
    });

    // @ts-ignore
    return (
        <Resizable
            defaultSize={{ width: '320px', height: '100%' }}
            enable={{ top:false, right:false, bottom:false, left:true,
                topRight:false, bottomRight:false, bottomLeft:false, topLeft:false }}
            minWidth='310px'
        >
        <div className='panel'>
            <iframe
                width="640px"
                height="480px"
                src="https://forms.office.com/Pages/ResponsePage.aspx?id=hfK3hV-qlEODFuxxFqqe9TuA2QK9G0hMhXAHa41cXqtUM0VHQzNHVEtZNVIwSjNDTDNIRFpPRjVDSy4u&embed=true"
                frameBorder="0"
                // @ts-ignore
                marginWidth="0"
                // @ts-ignore
                marginHeight="0"
                // @ts-ignore
                // style="border: none; max-width:100%; max-height:100%"
                id="adinfoFrame"
            >
            </iframe>
        </div>
        </Resizable>

    );
};