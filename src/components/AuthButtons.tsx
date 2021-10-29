import * as React from "react";

import { useReduxContext } from "../context/Context";
import { Resizable } from "re-resizable";
import { DragHandle } from "../elements/DragHandle";
import { Button } from "@progress/kendo-react-buttons";
import { MessageType } from "../types/types";
import { sendMessageToBackgroundAndPopup, sendMessageToContent } from "../helpers/messaging";

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

    return (
        <div style={{padding: "5px 0"}}>
            {auth && <span>Authenticated: {name}</span>}
            {!auth && <span>You need to login </span>}
            <Button onClick={auth? handleLogout: handleLogin}>Logout</Button>

            &nbsp;&nbsp;
            <Button look="flat" onClick={handleCheck}>Check</Button>&nbsp;
            <Button look="flat" onClick={handleLogin}>Login</Button>&nbsp;
            <Button look="flat" onClick={handleLogout}>Logout</Button>
        </div>
    );

}

