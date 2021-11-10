import React, { useState } from 'react';

import { Resizable, ResizeCallback } from "re-resizable";

import { DragHandle } from "../elements/DragHandle";
import { useReduxContext} from "../context/Context";
import { MessageType } from "../types/messageTypes";
import { sendMessageToBackgroundAndPopup, sendMessageToContent } from "../helpers/messaging";

// @ts-ignore
export const Panel = ({ children , enabled = false }) => {

    // todo
    console.log('panel rendered');

    // @ts-ignore
    const { tableWidth, updateDisplaySettings } = useReduxContext();
    let defaultWidth = enabled ? 600 : 330;
    // using local state to avoid render issue when waiting for new state to arrive


    // const [width, setWidth] = useState(enabled ? (parseInt(tableWidth) || 600) : 330);

    const width = enabled ? (parseInt(tableWidth) || 600) : 330;

    const handleResize :  ResizeCallback = (event, direction, ref, delta) : void => {
        // setWidth((width) => { return width + delta.width;});

        let newWidth = width + delta.width;
        updateDisplaySettings(newWidth);

        sendMessageToBackgroundAndPopup({
            type: "TOGGLE_DISPLAY_SETTING",
            source: 'Panel',
            payload:  "" + newWidth
        });
    }

    return (
        <Resizable
            defaultSize={{ width: defaultWidth, height: '100%' }}
            size={{ width: width, height: '100%' }}
            enable={{ left: enabled,
                top:false, right:false, bottom:false,
                topRight:false, bottomRight:false, bottomLeft:false, topLeft:false }}
            minWidth={defaultWidth}
            handleComponent={{ left: DragHandle }}
            // maxWidth='90%'
            style={{ padding: "5px" }}
            onResizeStop={handleResize}
        >
            {children}
        </Resizable>
    );
};