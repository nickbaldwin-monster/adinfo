import * as React from "react";

import { Button } from "@progress/kendo-react-buttons";

import { sendMessageToBackgroundAndPopup } from "../helpers/messaging";
import { Panel } from "./Panel";



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

    let message = "You may need to login.";

    if (false) {
        return (
            <>
                <Button onClick={handleCheck}>Check</Button>
                <Button onClick={handleLogin}>Login</Button>
                <Button onClick={handleLogout}>Logout</Button>
            </>
        );
    }

    return (
        <Panel>
            <div className="scrollInPanel">
                <h4>Login</h4>
                <p>{message}</p>
                <br />
                <Button onClick={handleLogin}>Login</Button>
            </div>
        </Panel>
    );
}

