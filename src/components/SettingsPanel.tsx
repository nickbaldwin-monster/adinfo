import * as React from "react";

import { logger } from "../helpers/logger";
import "../elements/Button.css";
import { useReduxContext } from "../context/Context";



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
        <div className="buttonContainer">
            <button className="toggleButton" onClick={toggle}>
                toggle display
            </button>
        </div>
    );
};