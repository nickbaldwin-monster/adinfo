import * as React from "react";

import { useReduxContext } from "../context/Context";

import { logger } from "../helpers/logger";

import { Resizable } from "re-resizable";
import { DragHandle } from "../elements/DragHandle";
import { Button } from "@progress/kendo-react-buttons";
import {MessageType} from "../types/types";

const moduleName = 'LoginPanel';
let log = logger(moduleName);
log({ logType: 'LOADED' });


// @ts-ignore
export const LoginPanel = () => {

    let message = "You may need to login. Please click the plugin icon in the extension toolbar above.";

    return (
        <Resizable
            defaultSize={{ width: '320px', height: '100%' }}
            enable={{ top:false, right:false, bottom:false, left:true,
                topRight:false, bottomRight:false, bottomLeft:false, topLeft:false }}
            minWidth='310px'
            handleComponent={{left: DragHandle}}
        >
            <div className='settingsPanel panel'>
                <h4>Login</h4>
                <p>{message}</p>
                <br />
            </div>
        </Resizable>
    );
}

