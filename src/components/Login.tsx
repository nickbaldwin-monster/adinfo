import * as React from "react";
import { Button } from "@progress/kendo-react-buttons";
import { Spacer } from "../elements/Spacer";

import "../windows/PopupWindow.css";


// @ts-ignore
export const Login = ({isMsal, auth, handleLogin, handleLogout, check}) => {

    let displayAuth = auth ? 'You are already logged in!' : 'You must login.';
    let buttonText = auth ? "Sign out" : "Sign in";
    let handle = auth ? handleLogout : handleLogin;

    if (!isMsal) {
        return (
            <>
                <h4 className="k-h4">Monster AdInfo</h4>
                <div id="loginDisplay">
                    <p className="k-paragraph" >Not ready to authenticate...</p>
                </div>
            </>
        );
    }
    else {
        return (
            <>
                <h4 className="k-h4">Monster AdInfo</h4>
                <div id="loginDisplay">
                    <p className="k-paragraph" id="message">{displayAuth}</p>
                    <br />
                    <Button id="authenticate" onClick={handle} primary={!auth}>{buttonText}</Button>
                    <br />
                </div>
            </>
        );
    }

};