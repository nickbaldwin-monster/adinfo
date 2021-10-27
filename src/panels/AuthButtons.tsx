import * as React from "react";

import { useReduxContext } from "../context/Context";

import { logger } from "../helpers/logger";

import { Resizable } from "re-resizable";
import { DragHandle } from "../elements/DragHandle";
import { Button } from "@progress/kendo-react-buttons";
import {MessageType} from "../types/types";
import {sendMessageToBackgroundAndPopup, sendMessageToContent} from "../helpers/messaging";

const moduleName = 'LoginPanel';
let log = logger(moduleName);
log({ logType: 'LOADED' });


// @ts-ignore
export const AuthButtons = ({ auth, name} ) => {

    const handleCheck = () => {
        sendMessageToBackgroundAndPopup({
            type: "LOGIN_STATUS_REQUEST",
            source: "loginPanel"
        });
    };
    const handleLogin = () => {
        sendMessageToBackgroundAndPopup({
            type: "LOGIN_REQUEST",
            source: "loginPanel"
        });
    };
    const handleLogout = () => {
        sendMessageToBackgroundAndPopup({
            type: "LOGOUT_REQUEST",
            source: "loginPanel"
        });
    };

    if (auth) {
        return (
            <div>
                <span>Authenticated: {name}</span>
                <Button onClick={handleLogout}>Logout</Button>

                &nbsp;&nbsp;&nbsp;
                <Button onClick={handleCheck}>Check</Button>&nbsp;
                <Button onClick={handleLogin}>Login</Button>&nbsp;
            </div>
        );
    }
    else {
        return (
            <div>
                <span>You need to login</span>&nbsp;
                <Button onClick={handleLogin}>Login</Button>&nbsp;
                &nbsp;&nbsp;&nbsp;
                <Button onClick={handleCheck}>Check</Button>&nbsp;
                <Button onClick={handleLogout}>Logout</Button>
            </div>
        );
    }

}

