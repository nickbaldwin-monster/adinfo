import {
    currentVersion,
    DataModel,

    getNamesOfJobProperties,
    getNamesOfDataSettings,
    getNamesOfFeatureSettings,
    getNamesOfAllProperties,
    getNamesOfDisplaySettings,

} from './DataModel';
import {
    getDefaultUserSettings,
    isValidDataSetting,
    isValidDisplaySetting,
    isValidFeatureSetting,
    isValidUserSettings,
    userSettingsReducer
} from "./UserSettings";



let prevStore = {
    "version": "2.0.5",
    "settings": {
        "position": {
            "visible": true,
            "width": "50px"
        },
        "adRank": {
            "visible": true,
            "width": "50px"
        },
        "remainder": {
            "visible": true,
            "width": "40px"
        },
        "adProvider": {
            "visible": true,
            "width": "120px"
        },
        "company": {
            "visible": true,
            "width": "100px"
        },
        "title": {
            "visible": true,
            "width": "150px"
        },
        "location": {
            "visible": true,
            "width": "120px"
        },
        "nowId": {
            "visible": true,
            "width": "80px"
        },
        "jobId": {
            "visible": true,
            "width": "80px"
        },
        "template": {
            "visible": true,
            "width": "80px"
        },
        "xCode": {
            "visible": true,
            "width": "80px"
        },
        "applyType": {
            "visible": false,
            "width": "70px"
        },
        "formattedDate": {
            "visible": true,
            "width": "70px"
        },
        "mesco": {
            "visible": false,
            "width": "100px"
        },
        "provider": {
            "visible": false,
            "width": "70px"
        },
        "providerCode": {
            "visible": false,
            "width": "80px"
        },
        "dateRecency": {
            "visible": true,
            "width": "80px"
        },
        "ingestionMethod": {
            "visible": false,
            "width": "70px"
        },
        "pricingType": {
            "visible": true,
            "width": "50px"
        },
        "seoJobId": {
            "visible": false,
            "width": "60px"
        },
        "refCode": {
            "visible": false,
            "width": "60px"
        },
        "validThrough": {
            "visible": false,
            "width": "80px"
        },
        "validThroughGoogle": {
            "visible": true,
            "width": "80px"
        },
        "remote": {
            "visible": true,
            "width": "50px"
        }
    },
    "order": [
        "position",
        "adRank",
        "remainder",
        "adProvider",
        "company",
        "title",
        "location",
        "nowId",
        "jobId",
        "template",
        "xCode",
        "applyType",
        "formattedDate",
        "mesco",
        "provider",
        "providerCode",
        "dateRecency",
        "ingestionMethod",
        "pricingType",
        "seoJobId",
        "refCode",
        "validThrough",
        "validThroughGoogle",
        "remote"
    ]
};


let almostCurrentStore = {
    "version": "2.2.0",
    "dataSettings": {
        "position": {
            "visible": true,
            "width": "50px"
        },
        "adRank": {
            "visible": true,
            "width": "70px"
        },
        "remainder": {
            "visible": true,
            "width": "90px"
        },
        "adProvider": {
            "visible": true,
            "width": "120px"
        },
        "company": {
            "visible": true,
            "width": "100px"
        },
        "title": {
            "visible": true,
            "width": "150px"
        },
        "location": {
            "visible": true,
            "width": "120px"
        },
        "nowId": {
            "visible": true,
            "width": "80px"
        },
        "jobId": {
            "visible": false,
            "width": "80px"
        },
        "template": {
            "visible": false,
            "width": "80px"
        },
        "xCode": {
            "visible": true,
            "width": "80px"
        },
        "applyType": {
            "visible": false,
            "width": "70px"
        },
        "formattedDate": {
            "visible": false,
            "width": "70px"
        },
        "mesco": {
            "visible": false,
            "width": "100px"
        },
        "provider": {
            "visible": false,
            "width": "70px"
        },
        "providerCode": {
            "visible": false,
            "width": "80px"
        },
        "dateRecency": {
            "visible": false,
            "width": "80px"
        },
        "ingestionMethod": {
            "visible": false,
            "width": "70px"
        },
        "pricingType": {
            "visible": false,
            "width": "50px"
        },
        "seoJobId": {
            "visible": false,
            "width": "60px"
        },
        "refCode": {
            "visible": false,
            "width": "60px"
        },
        "validThrough": {
            "visible": false,
            "width": "80px"
        },
        "validThroughGoogle": {
            "visible": false,
            "width": "80px"
        },
        "remote": {
            "visible": false,
            "width": "50px"
        }
    },
    "dataOrder": [
        "position",
        "adRank",
        "remainder",
        "adProvider",
        "company",
        "title",
        "location",
        "nowId",
        "jobId",
        "template",
        "xCode",
        "applyType",
        "formattedDate",
        "mesco",
        "provider",
        "providerCode",
        "dateRecency",
        "ingestionMethod",
        "pricingType",
        "seoJobId",
        "refCode",
        "validThrough",
        "validThroughGoogle",
        "remote"
    ],
    "featureSettings": {
        "decorateResults": {
            "enabled": true,
            "disabled": false
        },
        "displayDevInfo": {
            "enabled": false,
            "disabled": false
        }
    },
    "featureOrder": [
        "decorateResults",
        "displayDevInfo"
    ]
}


let currentStoreMinusOne = {
    "version": "2.3.0",
    "dataSettings": {
        "position": {
            "visible": true,
            "width": "50px"
        },
        "adRank": {
            "visible": true,
            "width": "70px"
        },
        "remainder": {
            "visible": true,
            "width": "90px"
        },
        "ecpm": {
            "visible": false,
            "width": "290px"
        },
        "price": {
            "visible": true,
            "width": "190px"
        },
        "adProvider": {
            "visible": true,
            "width": "120px"
        },
        "company": {
            "visible": true,
            "width": "100px"
        },
        "title": {
            "visible": true,
            "width": "150px"
        },
        "location": {
            "visible": true,
            "width": "120px"
        },
        "nowId": {
            "visible": true,
            "width": "80px"
        },
        "jobId": {
            "visible": false,
            "width": "80px"
        },
        "template": {
            "visible": false,
            "width": "80px"
        },
        "xCode": {
            "visible": true,
            "width": "80px"
        },
        "applyType": {
            "visible": false,
            "width": "70px"
        },
        "formattedDate": {
            "visible": false,
            "width": "70px"
        },
        "mesco": {
            "visible": false,
            "width": "100px"
        },
        "provider": {
            "visible": false,
            "width": "70px"
        },
        "providerCode": {
            "visible": false,
            "width": "80px"
        },
        "dateRecency": {
            "visible": false,
            "width": "80px"
        },
        "ingestionMethod": {
            "visible": false,
            "width": "70px"
        },
        "pricingType": {
            "visible": false,
            "width": "50px"
        },
        "seoJobId": {
            "visible": false,
            "width": "60px"
        },
        "refCode": {
            "visible": false,
            "width": "60px"
        },
        "validThrough": {
            "visible": false,
            "width": "80px"
        },
        "validThroughGoogle": {
            "visible": false,
            "width": "80px"
        },
        "remote": {
            "visible": false,
            "width": "50px"
        },
        "decisionId": {
            "visible": false,
            "width": "500px"
        }
    },
    "dataOrder": [
        "position",
        "adRank",
        "remainder",
        "ecpm",
        "price",
        "adProvider",
        "company",
        "title",
        "location",
        "nowId",
        "jobId",
        "template",
        "xCode",
        "applyType",
        "formattedDate",
        "mesco",
        "provider",
        "providerCode",
        "dateRecency",
        "ingestionMethod",
        "pricingType",
        "seoJobId",
        "refCode",
        "validThrough",
        "validThroughGoogle",
        "remote",
        "decisionId"
    ],
    "featureSettings": {
        "decorateResults": {
            "enabled": true,
            "disabled": false
        },
        "displayDevInfo": {
            "enabled": false,
            "disabled": false
        }
    },
    "featureOrder": [
        "decorateResults",
        "displayDevInfo"
    ],
    "displaySettings": {
        "tableWidth": {
            "value": "600px"
        }
    },
    "displayOrder": [
        "tableWidth",
    ]
};

let currentStore = {
    "version": "2.4.0",
    "dataSettings": {
        "position": {
            "visible": true,
            "width": "50px"
        },
        "adRank": {
            "visible": true,
            "width": "70px"
        },
        "ecpm": {
            "visible": false,
            "width": "290px"
        },
        "price": {
            "visible": true,
            "width": "190px"
        },
        "adProvider": {
            "visible": true,
            "width": "120px"
        },
        "company": {
            "visible": true,
            "width": "100px"
        },
        "title": {
            "visible": true,
            "width": "150px"
        },
        "description": {
            "visible": false,
            "width": "200px"
        },
        "location": {
            "visible": true,
            "width": "120px"
        },
        "nowId": {
            "visible": true,
            "width": "80px"
        },
        "jobId": {
            "visible": false,
            "width": "80px"
        },
        "template": {
            "visible": false,
            "width": "80px"
        },
        "xCode": {
            "visible": true,
            "width": "80px"
        },
        "applyType": {
            "visible": false,
            "width": "70px"
        },
        "formattedDate": {
            "visible": false,
            "width": "70px"
        },
        "mesco": {
            "visible": false,
            "width": "100px"
        },
        "provider": {
            "visible": false,
            "width": "70px"
        },
        "providerCode": {
            "visible": false,
            "width": "80px"
        },
        "dateRecency": {
            "visible": false,
            "width": "80px"
        },
        "ingestionMethod": {
            "visible": false,
            "width": "70px"
        },
        "pricingType": {
            "visible": false,
            "width": "50px"
        },
        "seoJobId": {
            "visible": false,
            "width": "60px"
        },
        "refCode": {
            "visible": false,
            "width": "60px"
        },
        "validThrough": {
            "visible": false,
            "width": "80px"
        },
        "validThroughGoogle": {
            "visible": false,
            "width": "80px"
        },
        "remote": {
            "visible": false,
            "width": "50px"
        },
        "decisionId": {
            "visible": false,
            "width": "500px"
        }
    },
    "dataOrder": [
        "position",
        "adRank",
        "ecpm",
        "price",
        "adProvider",
        "company",
        "title",
        "description",
        "location",
        "nowId",
        "jobId",
        "template",
        "xCode",
        "applyType",
        "formattedDate",
        "mesco",
        "provider",
        "providerCode",
        "dateRecency",
        "ingestionMethod",
        "pricingType",
        "seoJobId",
        "refCode",
        "validThrough",
        "validThroughGoogle",
        "remote",
        "decisionId"
    ],
    "featureSettings": {
        "decorateResults": {
            "enabled": true,
            "disabled": false
        },
        "displayDevInfo": {
            "enabled": false,
            "disabled": false
        }
    },
    "featureOrder": [
        "decorateResults",
        "displayDevInfo"
    ],
    "displaySettings": {
        "tableWidth": {
            "value": "600px"
        }
    },
    "displayOrder": [
        "tableWidth",
    ]
};


// sanity check
test('getJobProperties is an array of field names', () => {
    let fields = getNamesOfJobProperties();
    expect(fields).toEqual(
        expect.arrayContaining(['company', 'title'])
    );
});

describe('settings', () => {

    test('currentVersion', () => {
        expect(currentVersion.version).toEqual('2.4.0');
    });

    test('getAllProperties matches number of properties for current version', () => {
        let props = getNamesOfAllProperties();
        // @ts-ignore
        expect(props.length).toEqual(Object.keys(DataModel).length);
    });


});






describe('default settings', () => {

    test('default settings have property for all items in schema', () => {
        expect(getDefaultUserSettings().dataOrder.length).toEqual(Object.keys(DataModel).length - 4);
    });

    test('default settings have property for all items in schema - 27', () => {
        expect(getDefaultUserSettings().dataOrder.length).toEqual(27);
    });

    // todo - check matching array
    test.skip('default settings have property for all items in schema - 27', () => {
        expect(getDefaultUserSettings().dataOrder).toContain([
            "position", "adRank", "ecpm", "price",  "adProvider", "company", "title", "location", "nowId", "jobId", "template", "xCode", "applyType", "formattedDate", "mesco", "provider", "providerCode", "dateRecency", "ingestionMethod", "pricingType", "seoJobId", "refCode", "validThrough", "validThroughGoogle", "remote", "decisionId"
        ]);
    });

    // todo - check matching partial obj
    test.skip('default settings have expected properties', () => {
        expect(getDefaultUserSettings().dataSettings).toContain(expect.objectContaining({

            adProvider: {
                    visible: true,
                    width: "120px"
                },
            position: {
                visible: true,
                width: "50px"
            },
            adRank: {
                visible: false,
                width: "70px"
            },
            company: {
                visible: true,
                width: "100px"
            },
            mesco: {
                visible: false,
                width: "100px"
            },
            ecpm: {
                visible: false,
                width: "80px"
            },
            decisionId: {
                visible: false,
                width: "140px"
            },
            nowId: {
                visible: true,
                width: "80px"
            }
        }));
    });

    test('default settings have expected order', () => {
        expect(getDefaultUserSettings().dataOrder[0]).toEqual('position');
        expect(getDefaultUserSettings().dataOrder[2]).toEqual('ecpm');
        expect(getDefaultUserSettings().dataOrder[4]).toEqual('adProvider');
        expect(getDefaultUserSettings().dataOrder[26]).toEqual('decisionId');
    });


});







describe('isValidDataSetting', () => {

    test('', () => {
        let test = isValidDataSetting({ });
        expect(test).toEqual(false);
    });

    test('', () => {
        let test = isValidDataSetting('eee');
        expect(test).toEqual(false);
    });

    test('', () => {
        let test = isValidDataSetting(null);
        expect(test).toEqual(false);
    });

    test('flat object, valid name - should fail', () => {
        let test = isValidDataSetting({ position: false });
        expect(test).toEqual(false);
    });

    test('invalid name - should fail', () => {
        let test = isValidDataSetting({ pos: { visible: false, width: '50px'} });
        expect(test).toEqual(false);
    });

    test('valid - should pass', () => {
        let test = isValidDataSetting({ position: { visible: false, width: '50px'} });
        expect(test).toEqual(true);
    });

    test('missing req prop - fails', () => {
        let test = isValidDataSetting({ position: {  visi: false, width: '50px'} });
        expect(test).toEqual(false);
    });

    test('note - it ignores extra props', () => {
        let test = isValidDataSetting({ position: { blah: '', visible: false, width: '50px'} });
        expect(test).toEqual(true);
    });
});




describe('isValidFeatureSetting', () => {

    test('', () => {
        let test = isValidFeatureSetting({ });
        expect(test).toEqual(false);
    });

    test('', () => {
        let test = isValidFeatureSetting('eee');
        expect(test).toEqual(false);
    });

    test('', () => {
        let test = isValidFeatureSetting(null);
        expect(test).toEqual(false);
    });

    test('flat object, valid name - should fail', () => {
        let test = isValidFeatureSetting({ decorateResults: false });
        expect(test).toEqual(false);
    });

    test('invalid name - should fail', () => {
        let test = isValidFeatureSetting({ decorate: { enabled: false, disabled: false } });
        expect(test).toEqual(false);
    });

    test('valid - should pass', () => {
        let test = isValidFeatureSetting({ displayDevInfo: { enabled: false, disabled: false } });
        expect(test).toEqual(true);
    });

    test('missing req prop - fails', () => {
        let test = isValidFeatureSetting({ displayDevInfo: {  en: false, disabled: false } });
        expect(test).toEqual(false);
    });

    test('note - it ignores extra props', () => {
        let test = isValidFeatureSetting({ displayDevInfo: { enabled: false, disabled: false, blah: true } });
        expect(test).toEqual(true);
    });

});

describe('isValidDisplaySetting', () => {

    test('', () => {
        let test = isValidDisplaySetting({});
        expect(test).toEqual(false);
    });

    test('', () => {
        let test = isValidDisplaySetting('eee');
        expect(test).toEqual(false);
    });

    test('', () => {
        let test = isValidDisplaySetting(null);
        expect(test).toEqual(false);
    });

    test('flat object, valid name - should fail', () => {
        let test = isValidDisplaySetting({value: "efef"});
        expect(test).toEqual(false);
    });
    test('f', () => {
        let test = isValidDisplaySetting({ tableWidth: { value: "efef" }});
        expect(test).toEqual(true);
    });

    test('f', () => {
        let test = isValidDisplaySetting({ tableW: { value: "efef" }});
        expect(test).toEqual(false);
    });

    test('f', () => {
        let test = isValidDisplaySetting({ tableWidth: { something: "efef" }});
        expect(test).toEqual(false);
    });

    test('f', () => {
        let test = isValidDisplaySetting({ tableWidth: { value: true }});
        expect(test).toEqual(false);
    });


});


describe('isValidUserSettings', () => {

    test('', () => {
        let test = isValidUserSettings({})
        expect(test).toEqual(false);
    });

    test('', () => {
        let test = isValidUserSettings({
            position: false
        });
        expect(test).toEqual(false);
    });
    test('', () => {
        let test = isValidUserSettings({
            position: false,
            version: '2.0.3'
        });
        expect(test).toEqual(false);
    });
    test('', () => {
        let test = isValidUserSettings({
            version: '2.0.3',
            order: [],
            settings: {}
        });
        expect(test).toEqual(false);
    });



    test('default settings - valid', () => {
        let test = isValidUserSettings(getDefaultUserSettings());
        expect(test).toEqual(true);
    });


    test('default settings with arbitrary version - valid', () => {
        let test = isValidUserSettings({
            version: '3',
            dataOrder: getNamesOfDataSettings(),
            dataSettings: getDefaultUserSettings().dataSettings,
            featureOrder: getNamesOfFeatureSettings(),
            featureSettings: getDefaultUserSettings().featureSettings,
            displayOrder: getNamesOfDisplaySettings(),
            displaySettings: getDefaultUserSettings().displaySettings,
        });
        expect(test).toEqual(true);
    });


    test('default settings with different order - valid', () => {
        let test = isValidUserSettings({
            version: '3',
            dataOrder: getNamesOfDataSettings().reverse(),
            dataSettings: getDefaultUserSettings().dataSettings,
            featureOrder: getNamesOfFeatureSettings().reverse(),
            featureSettings: getDefaultUserSettings().featureSettings,
            displayOrder: getNamesOfDisplaySettings(),
            displaySettings: getDefaultUserSettings().displaySettings,
        });
        expect(test).toEqual(true);
    });


    test('valid settings - valid', () => {
        let test = isValidUserSettings({
            version: '???',
            dataOrder: getNamesOfDataSettings(),
            dataSettings: {
                ...getDefaultUserSettings().dataSettings,
                position: { width: '10000px', visible: false }
            },
            featureOrder: getNamesOfFeatureSettings().reverse(),
            featureSettings: getDefaultUserSettings().featureSettings,
            displayOrder: getNamesOfDisplaySettings(),
            displaySettings: getDefaultUserSettings().displaySettings,
        });
        expect(test).toEqual(true);
    });


    test('invalid settings - missing feature settings', () => {
        let test = isValidUserSettings({
            version: '???',
            dataOrder: getNamesOfDataSettings(),
            dataSettings: {
                ...getDefaultUserSettings().dataSettings,
                position: { width: '10000px', visibility: false }
            },
            displayOrder: getNamesOfDisplaySettings(),
            displaySettings: getDefaultUserSettings().displaySettings,
        });
        expect(test).toEqual(false);
    });


    test('valid settingsfor 2.3.0 - valid', () => {
        let test = isValidUserSettings(currentStore);
        expect(test).toEqual(true);
    });

    test('valid settings for 2.2.0 - invalid', () => {
        let test = isValidUserSettings(almostCurrentStore);
        expect(test).toEqual(false);
    });


});






describe('userSettingsReducer', () => {
    test('valid data setting change - visible', () => {
        let current = JSON.parse(JSON.stringify(currentStore));
        // settings: UserSettings, settingName: string, settingType: string, settingProperty: string, newValue?: string
        let result = userSettingsReducer(current, 'company', 'dataSettings', 'visible');
        expect(result).toEqual({
            ...current,
            dataSettings: {
                ...current.dataSettings,
                company : {
                    visible: false,
                    width: current.dataSettings.company.width
                }
            }
        });
    });

    test('invalid data setting change - no prop', () => {
        let current = JSON.parse(JSON.stringify(currentStore));
        // settings: UserSettings, settingName: string, settingType: string, settingProperty: string, newValue?: string
        let result = userSettingsReducer(current, 'company', 'dataSettings', 'foo');
        expect(result).toEqual({...current,});
    });

    test('valid data setting change - width', () => {
        let current = JSON.parse(JSON.stringify(currentStore));
        // settings: UserSettings, settingName: string, settingType: string, settingProperty: string, newValue?: string
        let result = userSettingsReducer(current, 'company', 'dataSettings', 'width', "300px");
        expect(result).toEqual({
            ...current,
            dataSettings: {
                ...current.dataSettings,
                company : {
                    visible: true,
                    width: "300px"
                }
            }
        });
    });

    test('invalid data setting change - width - missing value', () => {
        let current = JSON.parse(JSON.stringify(currentStore));
        // settings: UserSettings, settingName: string, settingType: string, settingProperty: string, newValue?: string
        let result = userSettingsReducer(current, 'company', 'dataSettings', 'foo');
        expect(result).toEqual({...current,});
    });

    test('valid feature setting change', () => {
        let current = JSON.parse(JSON.stringify(currentStore));
        // settings: UserSettings, settingName: string, settingType: string, settingProperty: string, newValue?: string
        let result = userSettingsReducer(current, 'decorateResults', 'featureSettings', 'enabled',);
        expect(result).toEqual({
            ...current,
            featureSettings: {
                ...current.featureSettings,
                decorateResults : {
                    enabled: false,
                    disabled: false
                }
            }
        });
    });

    test('valid display setting change', () => {
        let current = JSON.parse(JSON.stringify(currentStore));
        // settings: UserSettings, settingName: string, settingType: string, settingProperty: string, newValue?: string
        let result = userSettingsReducer(current, 'tableWidth', 'displaySettings', 'value', '400px');
        expect(result).toEqual({
            ...current,
            displaySettings: {
                ...current.displaySettings,
                tableWidth : {
                    value: "400px"
                }
            }
        });
    });

    test('invalid display setting change', () => {
        let current = JSON.parse(JSON.stringify(currentStore));
        // settings: UserSettings, settingName: string, settingType: string, settingProperty: string, newValue?: string
        let result = userSettingsReducer(current, 'tableWidth', 'displaySettings', 'boo', '400px');
        expect(result).toEqual({...current,});
    });


    test('invalid setting type ', () => {
        let current = JSON.parse(JSON.stringify(currentStore));
        // settings: UserSettings, settingName: string, settingType: string, settingProperty: string, newValue?: string
        let result = userSettingsReducer(current, 'tableWidth', 'somethingSettings', 'tableWidth', '400px');
        expect(result).toEqual({...current,});
    });

});