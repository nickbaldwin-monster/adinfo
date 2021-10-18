import * as React from "react";

import { useReduxContext } from "../context/Context";
import { MessageType } from "../types/types";
import { logger } from "../helpers/logger";

import { Switch } from "@progress/kendo-react-inputs";
import { Label } from "@progress/kendo-react-labels";
import { Resizable } from "re-resizable";

import "./SettingsPanel.css";

import { DragHandle } from "../elements/DragHandle";
import {getNamesOfJobFields, DataModel} from "../model/dataModel";


const moduleName = 'SettingsPanel';
let log = logger(moduleName);
log({ logType: 'LOADED' });



interface Setting {
    key: string;
    value: boolean;
}



export const SettingsPanel = () => {

    // @ts-ignore
    const { settings, decorate, displayDevInfo } = useReduxContext();

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
            payload: {settingName: 'decorateResults', property: 'enabled'}
        };
        chrome.runtime.sendMessage(message);
    };


    const handleToggleFeatureSetting = (settingName: string) => {

        const message: MessageType = {
            type: "TOGGLE_FEATURE_SETTING",
            source: 'SettingsPanel',
            payload: { settingName, property: 'enabled' }
        };
        chrome.runtime.sendMessage(message);
    };


    let list: string[] = settings.dataOrder;
    if (!settings || !settings.dataOrder || !settings.dataSettings) {
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
                    <p>Nothing to see here!</p>
                </div>
            </Resizable>
        );
    }

    // todo - disable settings based on model

    return (
        <Resizable
            defaultSize={{ width: '320px', height: '100%' }}
            enable={{ top:false, right:false, bottom:false, left:true,
                topRight:false, bottomRight:false, bottomLeft:false, topLeft:false }}
            minWidth='310px'
            handleComponent={{ left: DragHandle }}
        >
        <div className='settingsPanel panel'>
            <h4>Settings</h4>
            {list.map(setting => (
                <div className='setting'>
                    <Switch
                        disabled={DataModel[setting].disabled || false}
                        onChange={() => {
                            handleToggleSetting(setting);
                        }}
                        checked={settings.dataSettings[setting].visible}
                    />
                    <span className='settingSpacer' />
                    <Label>{setting}</Label>
                </div>

            ))}

            <br />



            <div className='setting'>
                <Switch
                    onChange={()=> { handleToggleFeatureSetting('displayDevInfo') }}

                    checked={displayDevInfo}
                />
                <span className='settingSpacer' />
                <Label>Display dev info</Label>
            </div>

            <div className='setting'>
                <Switch
                    onChange={()=> { handleToggleFeatureSetting('decorateResults') }}
                    checked={decorate}
                />
                <span className='settingSpacer' />
                <Label>Overlay ad info on results</Label>
            </div>

        </div>
        </Resizable>
    );
};