// this is run as a popup script, displayed when the extension's icon is clicked

// todo - can be removed - as can html, and imclusion in manifest

import * as React from "react";
import * as ReactDOM from "react-dom";

import PopupWindow from "./windows/PopupWindow";

import "./popup.css";



const mountNode = document.getElementById("popup");
ReactDOM.render(<PopupWindow />, mountNode);





