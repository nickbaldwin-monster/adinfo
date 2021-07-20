import * as React from "react";

import { logger } from "../helpers/logger";
import "../elements/Button.css";
import { useReduxContext } from "../context/Context";

import { defaultSettings} from "../context/Context";

const moduleName = 'SettingsPanel';
let log = logger(moduleName);
log({ logType: 'LOADED' });


export const SettingsPanel = () => {

    // @ts-ignore
    const { loading, display, setDisplay } = useReduxContext();
    let isLoading = 'loading';

    const toggle = () => {
        setDisplay(!display);
    }



    
    
    

    return (
        <div>

            
            <label>title</label>
            <label>company</label>
            <label>jobId</label>
            <label>location</label>
            <label>adProvider</label>
            <label>mesco</label>
            <label>ingestionMethod</label>
            <label>pricingType</label>
            <label>formattedDate</label>
            <label>dateRecency</label>
            <label>provider</label>
            <label>providerCode</label>
            <label>applyType</label>
            <label>xCode</label>
            <label>seoJobId</label>

            
            <div className="buttonContainer">
                <button className="toggleButton" >
                    click me
                </button>
            </div>
        </div>
    );
};