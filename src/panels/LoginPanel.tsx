import * as React from "react";

import { useReduxContext } from "../context/Context";

import { logger } from "../helpers/logger";

import { Resizable } from "re-resizable";
import { DragHandle } from "../elements/DragHandle";
import { Button } from "@progress/kendo-react-buttons";
import { MessageType } from "../types/types";
import { sendMessageToBackgroundAndPopup, sendMessageToContent } from "../helpers/messaging";

const moduleName = 'LoginPanel';
let log = logger(moduleName);


// @ts-ignore
export const LoginPanel = () => {


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

    let message = "You may need to login. Please click the plugin icon in the extension toolbar above.";

    return (
        <Resizable
            defaultSize={{ width: '320px', height: '100%' }}
            enable={{ top:false, right:false, bottom:false, left:true,
                topRight:false, bottomRight:false, bottomLeft:false, topLeft:false }}
            minWidth='310px'
            handleComponent={{left: DragHandle}}
        >
            <div className='settingsPanel panel'>
                <h4>Login</h4>
                <p>{message}</p>
                <br />
                <Button onClick={handleCheck}>Check</Button>
                <Button onClick={handleLogin}>Login</Button>
                <Button onClick={handleLogout}>Logout</Button>
            </div>


        </Resizable>
    );
}

