import * as React from "react";

import { Button } from "../components/Button";
import "./Settings.css";
import { loadSettings, saveSettings } from "../helpers/state";

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
            <Button />

        </>
    );
};

export default Popup;
