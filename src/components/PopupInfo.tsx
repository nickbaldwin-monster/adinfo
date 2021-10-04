import * as React from "react";

import "./PopupInfo.css";

import { logger } from "../helpers/logger";


const moduleName = 'Popup Settings';
let log = logger(moduleName);
log({ logType: 'LOADED' });



// todo - extract
let name = "";
const manifest = chrome.runtime.getManifest();
if (manifest && manifest.name && manifest.version) {
    name = `${manifest.name} v. ${manifest.version}`
}
else {
    name = "";
}


const PopupInfo = () => {
    return (
        <>
            {name}!
        </>
    );
};

export default PopupInfo;
