import * as React from "react";

import { Button } from "@progress/kendo-react-buttons";

import { sendMessageToBackgroundAndPopup } from "../helpers/messaging";



// @ts-ignore
export const AuthButtons = ({ auth, name} ) => {

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
        <div style={{ padding: "5px 0" }}>
            {auth ?
                <span>Authenticated: {name}</span>
                :
                <span>You need to login </span>
            }
            <Button onClick={auth ? handleLogout : handleLogin}>Logout</Button>
        </div>
    );
}

