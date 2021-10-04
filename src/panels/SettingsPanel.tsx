import * as React from "react";

import { useReduxContext } from "../context/Context";
import { MessageType } from "../types/types";
import { logger } from "../helpers/logger";

import { Switch } from "@progress/kendo-react-inputs";
import { Label } from "@progress/kendo-react-labels";
import { Resizable } from "re-resizable";

import "./SettingsPanel.css";
import "../elements/Button.css";
import { DragHandle } from "../elements/DragHandle";

const moduleName = 'SettingsPanel';
let log = logger(moduleName);
log({ logType: 'LOADED' });



interface Setting {
    key: string;
    value: boolean;
}



export const SettingsPanel = () => {

    // @ts-ignore
    const { loading, display, setDisplay, settings, decorate } = useReduxContext();

    const handleToggleSetting = (setting: string) => {
        const message: MessageType = {
            type: "TOGGLE_SETTING",
            source: 'SettingsPanel',
            payload: setting
        };
        chrome.runtime.sendMessage(message);
    };
    const handleToggleDecorate = () => {
        const message: MessageType = {
            type: "TOGGLE_DECORATE",
            source: 'SettingsPanel',
        };
        chrome.runtime.sendMessage(message);
    };

    let settingsArray: Setting[] = [];
    if (settings) {
        for (const [k, v] of Object.entries(settings)) {
            if (typeof v === 'boolean') {
                settingsArray.push({key: k, value: v});
            }
        }
    }

    let isLoading = 'loading';

    const toggle = () => {
        setDisplay(!display);
    }

    return (
        <Resizable
            defaultSize={{ width: '320px', height: '100%' }}
            enable={{ top:false, right:false, bottom:false, left:true,
                topRight:false, bottomRight:false, bottomLeft:false, topLeft:false }}
            minWidth='310px'
            handleComponent={{left: DragHandle}}
        >
        <div className='settingsPanel panel'>
            <h4>Settings</h4>
            {settingsArray.map(setting => (
                <div className='setting'>
                    <Switch
                        onChange={() => {
                            handleToggleSetting(setting.key);
                        }}
                        checked={setting.value}
                    />
                    <span className='settingSpacer' />
                    <Label>{setting.key}</Label>
                </div>


            ))}

            <br />

            <div className='setting'>
                <Switch
                    onChange={() => {
                        handleToggleDecorate();
                    }}
                    checked={decorate}
                />
                <span className='settingSpacer' />
                <Label>Overlay info on search results</Label>
            </div>

        </div>
        </Resizable>
    );
};