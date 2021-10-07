import * as React from "react";
import { Button } from "@progress/kendo-react-buttons";
import { Spacer } from "../elements/Spacer";


// @ts-ignore
export const Login = () => {

    const [authenticated, setAuthenticated] = React.useState(false);
    const toggle = () => {
        console.log('current state: ', authenticated);
        setAuthenticated(!authenticated);
    };

    let display = authenticated ? 'You are logged in!' : 'You are unauthenticated';
    let buttonText = authenticated ? "Sign out" : "Sign in";
    let action = authenticated ? "LOGOUT_REQUEST" : "LOGIN_REQUEST";

    const handle = () => {
        console.log('handle: ', action);
        let message = {
            type: action,
            source: 'login'
        };
        window.postMessage(message, "*");
    };

    return (
        <div id="" className="">
            <div id="loginDisplay">
                <br />
                <p id="message" className="message">{display}</p>
                <br />
                <Button id="authenticate" onClick={handle}>{buttonText}</Button>
            </div>

            <br />
            <Button id="toggle" onClick={toggle}>Toggle status</Button>
        </div>
    );

};