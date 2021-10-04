import * as React from "react";

import { MessageType } from "../types/types";
import "./Button.css";

export const Button = () => {
    const [display, setDisplay] = React.useState(true);

    React.useEffect(() => {
        chrome.runtime.sendMessage({ type: "REQ_DISPLAY_STATUS" });

        chrome.runtime.onMessage.addListener((message: MessageType) => {
            switch (message.type) {
                case "DISPLAY_STATUS":
                    setDisplay(message.display);
                    break;
                default:
                    break;
            }
        });
    }, []);

    const onClick = () => {
        chrome.runtime.sendMessage({ type: "TOGGLE_DISPLAY", display: !display });
    };

    return (
        <div className="buttonContainer">
            <button className="snowButton" onClick={onClick}>
                {display ? "Hide" : "Display️"}
            </button>
        </div>
    );
};