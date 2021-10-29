import { log } from "../helpers/logger";

import {
    currentVersion,
    DataModel,
    DisplayModel,
    FeatureModel,

    getNamesOfDataSettings,
    getNamesOfDisplaySettings,
    getNamesOfFeatureSettings,
    getAllFeatureSettings,
    getAllProperties,
    getAllDisplaySettings

} from "./DataModel";




export const featureSettingNamesMap = getAllFeatureSettings();
export const settingNamesMap = getAllProperties();
export const dataSettingNamesList = getNamesOfDataSettings();
export const featureSettingNamesList = getNamesOfFeatureSettings();
export const displaySettingNamesList = getNamesOfDisplaySettings();
export const displaySettingNamesMap = getAllDisplaySettings();

export interface DataSetting {
    [key: string]: { visible: boolean, width: string };
}
export interface FeatureSetting {
    [key: string]: { enabled: boolean };
}
export interface DisplaySetting {
    [key: string]: { enabled: boolean };
}
export interface UserSettings {
    version?: string;
    dataSettings: DataSetting | {};
    dataOrder: string[] | [];
    featureSettings: FeatureSetting | {};
    featureOrder: string[] | [];
    displaySettings: DisplaySetting | {};
    displayOrder: string[] | [];
}


export const getDefaultUserSettings = () => {
    let newSettings: UserSettings = {
        version: currentVersion.version,
        dataSettings: {},
        dataOrder: [],
        featureSettings: {},
        featureOrder: [],
        displaySettings:  {},
        displayOrder:  []
    }
    getNamesOfDataSettings().forEach((name: string) => {
         let setting = DataModel[name];
        // @ts-ignore
        newSettings.dataSettings[name] = { visible: setting.visible, width: setting.width };
        // @ts-ignore
        newSettings.dataOrder.push(name);
     });
    getNamesOfFeatureSettings().forEach((name: string) => {
        let setting = FeatureModel[name];
        // @ts-ignore
        newSettings.featureSettings[name] = { enabled: setting.enabled, disabled: setting.disabled };
        // @ts-ignore
        newSettings.featureOrder.push(name);
    });
    getNamesOfDisplaySettings().forEach((name: string) => {
        let setting = DisplayModel[name];
        // @ts-ignore
        newSettings.displaySettings[name] = { value: setting.value };
        // @ts-ignore
        newSettings.displayOrder.push(name);
    });

    return newSettings;
};


export const defaultUserSettings = getDefaultUserSettings();






export const isValidDataSetting = (dataSetting: DataSetting | any) : boolean => {
    if (!dataSetting || typeof dataSetting !== 'object' || dataSetting === {}) {
        return false
    }
    let key = Object.keys(dataSetting)[0];
    return !(!dataSetting[key] || typeof dataSetting[key] !== 'object' ||
        !(key in settingNamesMap) ||
        dataSetting[key].visible === undefined || typeof dataSetting[key].visible !== 'boolean' ||
        !dataSetting[key].width || typeof dataSetting[key].width !== 'string');
}

export const isValidFeatureSetting = (featureSetting: FeatureSetting | any ) : boolean => {
    if (!featureSetting || typeof featureSetting !== 'object' || featureSetting === {}) {
        return false
    }
    let key = Object.keys(featureSetting)[0];
    return !(!featureSetting[key] || typeof featureSetting[key] !== 'object' ||
        !(key in featureSettingNamesMap) ||
        featureSetting[key].enabled === undefined || typeof featureSetting[key].enabled !== 'boolean' ||
        featureSetting[key].disabled === undefined || typeof featureSetting[key].disabled !== 'boolean');
}

export const isValidDisplaySetting = (displaySetting: DisplaySetting | any ) : boolean => {
    if (!displaySetting || typeof displaySetting !== 'object' || displaySetting === {}) {
        return false
    }
    let key = Object.keys(displaySetting)[0];
    return !(!displaySetting[key] || typeof displaySetting[key] !== 'object' ||
        !(key in displaySettingNamesMap) ||
        displaySetting[key].value === undefined || typeof displaySetting[key].value !== 'string');
}

export const isValidUserSettings = (store: UserSettings | any | null | undefined) : any => {

    if (!store || !store.version || typeof store.version !== 'string' ||
        !store.dataSettings || typeof store.dataSettings !== 'object' ||
        !store.dataOrder || typeof store.dataOrder !== 'object' ||
        !store.featureSettings || typeof store.featureSettings !== 'object' ||
        !store.featureOrder || typeof store.featureOrder !== 'object' ||
        !store.displaySettings || typeof store.displaySettings !== 'object' ||
        !store.displayOrder || typeof store.displayOrder !== 'object'
    ) {
        return false;
    }
    let dataSettingNames = (Object.keys(store.dataSettings));
    if (dataSettingNames.length !== dataSettingNamesList.length ||
        store.dataOrder.length !== dataSettingNamesList.length) {
        return 2;
    }
    for (let i = 0; i < dataSettingNames.length; i++) {
        if (!isValidDataSetting({
            [dataSettingNames[i]]: store.dataSettings[dataSettingNames[i]]
        })) {
            return 3;
        }
    }
    let featureSettingNames = (Object.keys(store.featureSettings));
    if (featureSettingNames.length !== featureSettingNamesList.length ) {
        return 4;
    }
    for (let i = 0; i < featureSettingNames.length; i++) {
        if (!isValidFeatureSetting({
            [featureSettingNames[i]]: store.featureSettings[featureSettingNames[i]]
        })) {
            return 5;
        }
    }
    let displaySettingNames = (Object.keys(store.displaySettings));
    if (displaySettingNames.length !== displaySettingNamesList.length ||
        store.displayOrder.length !== displaySettingNamesList.length) {
        return 6;
    }
    for (let i = 0; i < displaySettingNames.length; i++) {
        if (!isValidDisplaySetting({
            [displaySettingNames[i]]: store.displaySettings[displaySettingNames[i]]
        })) {
            return 7;
        }
    }
    return true;
}


// @ts-ignore
export const userSettingsReducer = (settings: UserSettings, settingName: string, settingType: string, settingProperty: string, newValue?: string ) => {

    // @ts-ignore
    if (!settings || !settingName || !settingProperty || !settingType || !settings[settingType]) {
        log({
            logType: 'ERROR',
            error: 'unable to update Settings',
            payload: { settingName, settingProperty, settingType, newValue }
        });
        console.log('problem - old settings -: ', settings);
        return settings;
    }

    // @ts-ignore
    let type = settings[settingType] ?? {};
    let setting = type[settingName] ?? {};
    let prevValue = setting[settingProperty] ?? null;
    if (!type || !setting || !prevValue) {
        return settings;
    }

    let toggle = (settingProperty !== 'width' && settingProperty !== 'value');


    if (!toggle && !newValue)  {
        log({
            logType: 'ERROR',
            error: 'unable to update Settings',
            payload: { settingName, settingProperty, settingType, newValue }
        });
        console.log('problem - old settings -: ', settings);
        return settings;
    }

    let nextSettings = null;

    if (toggle) {
        return {
            ...settings,
            // @ts-ignore
            [settingType]: {
                // @ts-ignore
                ...settings[settingType],
                [settingName]: {
                    ...setting,
                    [settingProperty]: !prevValue
                }
            }
        }

    }
    else {
        return {
            ...settings,
            // @ts-ignore
            [settingType]: {
                // @ts-ignore
                ...settings[settingType],
                [settingName]: {
                    ...setting,
                    [settingProperty]: newValue
                }
            }
        }
    }





    /*

    if (!DataModel[settingName] ) {
        log({
            logType: 'ERROR',
            error: 'unable to update Settings',
            payload: { settingName }
        });
        console.log('problem - old settings -: ', settings);
        return settings;
    }

    // @ts-ignore
    let prevSettingValue = settings.dataSettings[settingName].visible;
    let nextSetting = {
        [settingName]: {
            // @ts-ignore
            ...settings.dataSettings[settingName],
            visible: !prevSettingValue
        }
    };
    if (!isValidDataSetting(nextSetting)) {
        log({
            logType: 'ERROR',
            error: 'unable to update Settings',
            payload: { nextSetting }
        });
        console.log('invalid setting');
        return settings;
    }
    else {
        let nextSettings = {
            ...settings,
            dataSettings: {
                ...settings.dataSettings,
                ...nextSetting
            }
        }
        log({
            logType: 'INFO',
            message: 'new state in reducer',
            payload: { nextSettings }
        });
        console.log('new settings: ', nextSettings);
        return nextSettings;
    }

     */


}