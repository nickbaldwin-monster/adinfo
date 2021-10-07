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


    let message = {
        type: 'AUTH_URI_REQUEST',
        source: 'login'
    };
    chrome.runtime.sendMessage(message, (response) => {
        console.log('auth uri request message sent to background');
    });

    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
        console.log('auth uri response from background');
        console.log(message);
    });



    return (
        <div id="" className="">
            <div id="loginDisplay">
                <br />
                <p id="message" className="message">{display}</p>
                <br />
                <Button id="authenticate">{buttonText}</Button>
            </div>

            <br />
            <Button id="toggle" onClick={toggle}>Toggle status</Button>
        </div>
    );

};