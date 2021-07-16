import * as React from "react";
import "./MiniToggleDisplay.css";



interface DisplayProps {
    handleClick: any;
}

export const MiniToggleDisplay = ( props: DisplayProps) => {
    let handleClick = props.handleClick
    return (
        <div className="miniToggleContainer">
            <button className="miniToggleButton" onClick={handleClick}>
                +
            </button>
        </div>
    );
};