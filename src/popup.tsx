// this is run as a popup script, displayed when the extension's icon is clicked

import * as React from "react";
import * as ReactDOM from "react-dom";

import PopupWindow from "./windows/PopupWindow";
import "./popup.css";

// todo - remove
const mountNode = document.getElementById("popup");
ReactDOM.render(<PopupWindow />, mountNode);





