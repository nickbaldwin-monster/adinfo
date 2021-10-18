import {
    currentVersion,
    DataModel,
    JobProperties,
    getNamesOfJobProperties,
    getAllProperties,
    getNamesOfDataSettings,
    getNamesOfFeatureSettings,
    needToMigrate,
    getDefaultUserSettings,
    migrateFlatObject,
    isValidUserSettings,
    isValidDataSetting,
    getNamesOfAllProperties,
    isValidFeatureSetting
} from './dataModel';



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

// sanity check
test('getJobProperties is an array of field names', () => {
    let fields = getNamesOfJobProperties();
    expect(fields).toEqual(
        expect.arrayContaining(['company', 'title'])
    );
});

describe('settings', () => {

    test('currentVersion', () => {
        expect(currentVersion.version).toEqual('2.0.5');
    });



    test('getAllProperties matches number of properties for current version', () => {
        let props = getNamesOfAllProperties();
        // @ts-ignore
        expect(props.length).toEqual(Object.keys(DataModel).length);
    });





    test.skip('getSettings matches all properties for current version', () => {
        let fields = getNamesOfDataSettings();
        // @ts-ignore
        expect(fields).toEqual([ ...JobProperties[currentVersion.version]]);
    });



});

describe('migration needed', () => {
    test('', () => {
        expect(needToMigrate('undefined')).toEqual(true);
    });
    test('', () => {
        expect(needToMigrate('')).toEqual(true);
    });
    test('', () => {
        expect(needToMigrate('null')).toEqual(true);
    });
    test('', () => {
        expect(needToMigrate(undefined)).toEqual(true);
    });

    test('', () => {
        expect(needToMigrate(null)).toEqual(true);
    });
    test('', () => {
        expect(needToMigrate('2.0.3')).toEqual(true);
    });
    test('', () => {
        expect(needToMigrate('2.0.4')).toEqual(true);
    });
    test('', () => {
        expect(needToMigrate('2.0.5')).toEqual(false);
    });
});



describe('default settings', () => {

    test.skip('default settings have property for all items in schema', () => {
        expect(getDefaultUserSettings().dataOrder.length).toEqual(Object.keys(DataModel).length - 4);
    });

    test.skip('default settings have property for all items in schema - 27', () => {
        expect(getDefaultUserSettings().dataOrder.length).toEqual(27);
    });

    test.skip('default settings have expected properties', () => {
        expect(getDefaultUserSettings().dataSettings).toEqual(expect.objectContaining({

            adProvider: {
                    visible: true,
                    width: "120px"
                },
            position: {
                    visible: true,
                    width: "50px"
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

    test.skip('default settings have expected order', () => {
        expect(getDefaultUserSettings().dataOrder[0]).toEqual('position');
        expect(getDefaultUserSettings().dataOrder[5]).toEqual('adProvider');
        expect(getDefaultUserSettings().dataOrder[26]).toEqual('decisionId');
    });


});




describe('migration', () => {
    test('empty store, gets default settings', () => {
        let store= {};
        let newStore = migrateFlatObject(store);
        expect(newStore).toEqual(getDefaultUserSettings());
    });

    test('flat store with invalid prop gets default', () => {
        let store= {blah: true};
        let newStore = migrateFlatObject(store);
        expect(newStore).toEqual(getDefaultUserSettings());
    });

    test('flat store with version and invalid prop gets default', () => {
        let store= {version: '2.0.3', blah: true};
        let newStore = migrateFlatObject(store);
        expect(newStore).toEqual(getDefaultUserSettings());
    });

    test.skip('flat store with valid prop gets default with prop visibility', () => {
        let store= { ecpm: true };
        let newStore = migrateFlatObject(store);
        expect(newStore.dataSettings).toEqual((expect.objectContaining({
            decisionIndex: { "visible": false, "width": "50px" }
        })));

        expect(newStore.dataOrder).toEqual((expect.arrayContaining([
            'position', 'decisionIndex', 'adProvider', 'company', 'title'
        ])));

        expect(newStore.dataOrder.length).toEqual(27);

    });

    test('flat store with valid prop and version gets default with prop visibility', () => {
        let store= {version: '2.0.3', ecpm: true};
        let newStore = migrateFlatObject(store);
        expect(newStore.dataSettings).toEqual((expect.objectContaining({
            adRank: { "visible": false, "width": "70px" }
        })));
        expect(newStore.version).toEqual(currentVersion.version);
    });


    test('prev valid store structure  - return deftault? ', () => {
        let store= {...prevStore};
        let newStore = migrateFlatObject(store);
        expect(newStore.version).toEqual(currentVersion.version);
        expect(newStore.dataSettings).toEqual(getDefaultUserSettings().dataSettings);
        expect(newStore).toEqual(getDefaultUserSettings());
    });





});


describe('need to migrate', () => {

    test('need to migrate empty', () => {
        expect(needToMigrate('')).toEqual(true);
    });
    test('need to migrate empty', () => {
        expect(needToMigrate(null)).toEqual(true);
    });
    test('need to migrate item listed', () => {
        expect(needToMigrate('2.0.3')).toEqual(true);
    });
    test('need to migrate item listed as false', () => {
        expect(needToMigrate('2.0.5')).toEqual(false);
    });
    test('need to migrate version not listed', () => {
        expect(needToMigrate('1.0.0')).toEqual(false);
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
        });
        expect(test).toEqual(false);
    });


});






describe.skip('', () => {
    test('', () => {

        expect('').toEqual('');
    });
});