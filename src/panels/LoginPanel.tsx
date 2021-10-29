import * as React from "react";

import { logger } from "../helpers/logger";

import { Button } from "@progress/kendo-react-buttons";
import { sendMessageToBackgroundAndPopup, sendMessageToContent } from "../helpers/messaging";
import { Panel } from "./Panel";
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
        <Panel>
            <div className="scrollInPanel">
                <h4>Login</h4>
                <p>{message}</p>
                <br />
                <Button onClick={handleCheck}>Check</Button>
                <Button onClick={handleLogin}>Login</Button>
                <Button onClick={handleLogout}>Logout</Button>
            </div>
        </Panel>
    );
}

