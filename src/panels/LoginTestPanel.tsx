import * as React from "react";

import { useReduxContext } from "../context/Context";

import { logger } from "../helpers/logger";

import { Login } from "../components/Login";
import { Resizable } from "re-resizable";
import { DragHandle } from "../elements/DragHandle";

const moduleName = 'LoginTestPanel';
let log = logger(moduleName);
log({ logType: 'LOADED' });



export const LoginTestPanel = () => {
    // @ts-ignore
    const { loading } = useReduxContext();

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
                <Login />
            </div>
        </Resizable>
    );
}

