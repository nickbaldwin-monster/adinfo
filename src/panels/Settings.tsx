import * as React from "react";

import { Button } from "../elements/Button";
import "./Settings.css";
import { loadSettings, saveSettings } from "../helpers/state";
import {logger} from "../helpers/logger";


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


const Popup = () => {
    return (
        <>
            {name}!
        </>
    );
};

export default Popup;
