import * as React from "react";

import { useReduxContext } from "../context/Context";
import { MessageType } from "../types/types";
import { logger } from "../helpers/logger";

import { Switch } from "@progress/kendo-react-inputs";
import { Label } from "@progress/kendo-react-labels";
import { Panel } from "./Panel";
import { sendMessageToBackgroundAndPopup } from '../helpers/messaging';
import { getNamesOfJobFields, DataModel, FeatureModel } from "../model/DataModel";

import "./SettingsPanel.css";




const moduleName = 'SettingsPanel';
let log = logger(moduleName);
log({ logType: 'LOADED' });


interface Setting {
    key: string;
    value: boolean;
}

export const SettingsPanel = () => {

    // @ts-ignore
    const { settings, decorate, displayDevInfo, auth, name } = useReduxContext();


    // todo - refactor into single setting message with params
    const handleToggleSetting = (setting: string) => {
        const message: MessageType = {
            type: "TOGGLE_SETTING",
            source: 'SettingsPanel',
            payload: setting
        };
        sendMessageToBackgroundAndPopup(message);

    };
    // todo - remove once confirmed not needed
    const handleToggleDecorate = () => {
        const message: MessageType = {
            type: "TOGGLE_DECORATE",
            source: 'SettingsPanel',
            payload: {settingName: 'decorateResults', property: 'enabled'}
        };
        sendMessageToBackgroundAndPopup(message);
    };


    const handleToggleFeatureSetting = (settingName: string) => {
        const message: MessageType = {
            type: "TOGGLE_FEATURE_SETTING",
            source: 'SettingsPanel',
            payload: { settingName, property: 'enabled' }
        };
        sendMessageToBackgroundAndPopup(message);
    };

    let showSettings = (settings?.dataOrder && settings?.dataSettings);
    let list: string[] = settings.dataOrder;

    return (
        <Panel>
            <div className="scrollInPanel">
                <h4>Settings</h4>
                {showSettings && list.map(setting => (
                    <div className='setting'>
                        <Switch
                            disabled={DataModel[setting].disabled || false}
                            onChange={() => { handleToggleSetting(setting) }}
                            checked={settings.dataSettings[setting].visible}
                        />
                        <span className='settingSpacer' />
                        <Label>{setting}</Label>
                    </div>

                ))}
                {!showSettings && <p>Nothing to see here!</p>}

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
                        disabled={FeatureModel.decorateResults.disabled || false}
                        onChange={()=> { handleToggleFeatureSetting('decorateResults') }}
                        checked={decorate}
                    />
                    <span className='settingSpacer' />
                    <Label>Overlay ad info on results</Label>
                </div>

            </div>
        </Panel>
    );
};