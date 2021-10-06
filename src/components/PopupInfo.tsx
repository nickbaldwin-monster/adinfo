import * as React from "react";

import "./PopupInfo.css";

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
        <div>
            <p>{name}!</p>
        </div>
    );
};

export default PopupInfo;
