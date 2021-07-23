import * as React from "react";

import { logger } from "../helpers/logger";

import "./MiniToggleDisplay.css";


const moduleName = 'MiniToggleDisplay';
let log = logger(moduleName);
log({ logType: 'LOADED' });



interface DisplayProps {
    handleClick: any;
}

export const MiniToggleDisplay = ( props: DisplayProps) => {
    let handleClick = props.handleClick
    return (
        <div className="miniToggleContainer">
            <button className="miniToggleButton" onClick={handleClick}>
                +
            </button>
        </div>
    );
};