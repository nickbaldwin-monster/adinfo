import React from 'react';

// todo - cut down css
import './Table.css';
import { Resizable} from "re-resizable";
import { DragHandle } from "../elements/DragHandle";

// @ts-ignore
export const Panel = ({ children , width = "330px", enabled = false}) => {
    console.log("job table rendered");
    return (
        <Resizable
            defaultSize={{ width: width, height: '100%' }}
            enable={{ left: enabled,
                top:false, right:false, bottom:false,
                topRight:false, bottomRight:false, bottomLeft:false, topLeft:false }}
            minWidth={width}
            handleComponent={{ left: DragHandle }}
            // maxWidth='90%'
            style={{ padding: "5px" }}
        >
            {children}
        </Resizable>
    );
};