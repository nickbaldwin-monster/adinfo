import {
    currentVersion,
    DataModel,
    JobProperties,
    getJobProperties,
    getAllProperties, getNamesOfSettings, needToMigrate,
    getDefaultUserSettings, migrateFlatObject, isValidUserSettings, isValidUserSetting, getNamesOfAllProperties
} from './dataModel';



// sanity check
test('getJobProperties is an array of field names', () => {
    let fields = getJobProperties();
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
        let fields = getNamesOfSettings();
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
        expect(getDefaultUserSettings().order.length).toEqual(Object.keys(DataModel).length - 4);
    });

    test.skip('default settings have property for all items in schema - 27', () => {
        expect(getDefaultUserSettings().order.length).toEqual(27);
    });

    test.skip('default settings have expected properties', () => {
        expect(getDefaultUserSettings().settings).toEqual(expect.objectContaining({

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
        expect(getDefaultUserSettings().order[0]).toEqual('position');
        expect(getDefaultUserSettings().order[5]).toEqual('adProvider');
        expect(getDefaultUserSettings().order[26]).toEqual('decisionId');
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
        expect(newStore.settings).toEqual((expect.objectContaining({
            decisionIndex: { "visible": false, "width": "50px" }
        })));

        expect(newStore.order).toEqual((expect.arrayContaining([
            'position', 'decisionIndex', 'adProvider', 'company', 'title'
        ])));

        expect(newStore.order.length).toEqual(27);

    });

    test('flat store with valid prop and version gets default with prop visibility', () => {
        let store= {version: '2.0.3', ecpm: true};
        let newStore = migrateFlatObject(store);
        expect(newStore.settings).toEqual((expect.objectContaining({
            decisionIndex: { "visible": false, "width": "50px" }
        })));
        expect(newStore.version).toEqual(currentVersion.version);
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
            order: getNamesOfSettings(),
            settings: getDefaultUserSettings().settings
        });
        expect(test).toEqual(true);
    });


    test('default settings with different order - valid', () => {
        let test = isValidUserSettings({
            version: '3',
            order: getNamesOfSettings().reverse(),
            settings: getDefaultUserSettings().settings
        });
        expect(test).toEqual(true);
    });


    test('valid settings - valid', () => {
        let test = isValidUserSettings({
            version: '???',
            order: getNamesOfSettings(),
            settings: {
                ...getDefaultUserSettings().settings,
                position: { width: '10000px', visible: false }
            },
        });
        expect(test).toEqual(true);
    });


    test('invalid settings - invalid', () => {
        let test = isValidUserSettings({
            version: '???',
            order: getNamesOfSettings(),
            settings: {
                ...getDefaultUserSettings().settings,
                position: { width: '10000px', visibility: false }
            },
        });
        expect(test).toEqual(false);
    });



});

describe('isValidUserSetting', () => {

    test('', () => {
        let test = isValidUserSetting({ });
        expect(test).toEqual(false);
    });

    test('', () => {
        let test = isValidUserSetting('eee');
        expect(test).toEqual(false);
    });

    test('', () => {
        let test = isValidUserSetting(null);
        expect(test).toEqual(false);
    });

    test('flat object, valid name - should fail', () => {
        let test = isValidUserSetting({ position: false });
        expect(test).toEqual(false);
    });

    test('invalid name - should fail', () => {
        let test = isValidUserSetting({ pos: { visible: false, width: '50px'} });
        expect(test).toEqual(false);
    });

    test('valid - should pass', () => {
        let test = isValidUserSetting({ position: { visible: false, width: '50px'} });
        expect(test).toEqual(true);
    });

    test('missing req prop - fails', () => {
        let test = isValidUserSetting({ position: {  visi: false, width: '50px'} });
        expect(test).toEqual(false);
    });

    test('note - it ignores extra props', () => {
        let test = isValidUserSetting({ position: { blah: '', visible: false, width: '50px'} });
        expect(test).toEqual(true);
    });
});





describe.skip('', () => {
    test('', () => {

        expect('').toEqual('');
    });
});