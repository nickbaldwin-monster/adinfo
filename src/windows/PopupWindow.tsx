import * as React from "react";

import "./PopupInfo.css";

let manifest = chrome.runtime.getManifest();
let name = manifest?.name  + " " + manifest?.version;


const PopupWindow = () => {

    return (
        <div className="popupWindowContainer">
            {name}
        </div>
    );


};

export default PopupWindow;
