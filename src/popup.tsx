// this is run as a popup script, displayed when the extension's icon is clicked

import * as React from "react";
import * as ReactDOM from "react-dom";

import { MessageType } from "./types/types";
import { logger } from "./helpers/logger";
import PopupWindow from "./windows/PopupWindow";
import "./popup.css";

const moduleName = 'popup';
const log = logger(moduleName);
log({ logType: 'LOADED' });

// display setting in popup
const mountNode = document.getElementById("popup");
ReactDOM.render(<PopupWindow />, mountNode);





