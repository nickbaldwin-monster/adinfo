import * as React from "react";

import { logger } from "../helpers/logger";
import "../elements/Button.css";
import { useReduxContext } from "../context/Context";

import { defaultSettings} from "../context/Context";
import { Switch } from "@progress/kendo-react-inputs";
import { Label } from "@progress/kendo-react-labels";

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
    const { loading, display, setDisplay, settings } = useReduxContext();


    const handleClick = (setting: string) => {
        // todo something
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
        <div className='settingsPanel'>

            {settingsArray.map(setting => (
                <div className='setting'>
                    <Switch
                        onChange={() => {
                            handleClick(setting.key);
                        }}
                        checked={setting.value}
                    />
                    <span className='settingSpacer' />
                    <Label>{setting.key}</Label>
                </div>
            ))}

            <div className="buttonContainer">
                <button className="toggleButton" >
                    click me
                </button>
            </div>

        </div>
    );
};