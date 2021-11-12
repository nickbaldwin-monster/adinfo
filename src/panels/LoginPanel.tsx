import * as React from "react";

import { Button } from "@progress/kendo-react-buttons";

import { sendMessageToBackgroundAndPopup } from "../helpers/messaging";
import { Panel } from "./Panel";



// @ts-ignore
export const LoginPanel = () => {

    const handleLogin = () => {
        sendMessageToBackgroundAndPopup({
            type: "LOGIN_REQUEST",
            source: "loginPanel"
        });
    };

    return (
        <Panel>
            <div className="scrollInPanel">
                <h4>Login</h4>
                <p>You may need to login.</p>
                <br />
                <Button onClick={handleLogin}>Login</Button>
            </div>
        </Panel>
    );
}

