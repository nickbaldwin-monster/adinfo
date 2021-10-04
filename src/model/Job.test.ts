import {
    currentVersion,
    job,
    JobProperties,
    getJobProperties,
    getAllProperties, getSettings, needToMigrate,
    getDefaultUserSettings, migrateFlatObject
} from './Job';



// sanity check
test('getJobProperties is an array of field names', () => {
    let fields = getJobProperties();
    expect(fields).toEqual(
        expect.arrayContaining(['company', 'title'])
    );
});

describe('settings', () => {

    test('currentVersion', () => {
        expect(currentVersion.version).toEqual('2.0.4');
    });

    test('getJobProperties matches properties listed for current version', () => {
        let fields = getJobProperties();
        // @ts-ignore
        expect(fields).toEqual(JobProperties[currentVersion.version]);
    });

    test('getAllProperties matches number of properties for current version', () => {
        let fields = getAllProperties();
        // @ts-ignore
        expect(fields.length).toEqual(Object.keys(job).length);
    });

    test('getAllProperties matches all properties for current version', () => {
        let fields = getAllProperties();
        // @ts-ignore
        expect(fields).toEqual(['position', ...JobProperties[currentVersion.version]]);
    });



    test('getSettings matches all properties for current version', () => {
        let fields = getSettings();
        // @ts-ignore
        expect(fields).toEqual(['position', ...JobProperties[currentVersion.version]]);
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

    test('default settings have property for all items in schema', () => {
        expect(getDefaultUserSettings().order.length).toEqual(Object.keys(job).length);
    });

    test('default settings have property for all items in schema - 27', () => {
        expect(getDefaultUserSettings().order.length).toEqual(27);
    });

    test('default settings have expected properties', () => {
        expect(getDefaultUserSettings().settings).toEqual(expect.objectContaining({

            adProvider: {
                    visible: true,
                    width: "120px"
                },
            decisionId: {
                    visible: false,
                    width: "140px"
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
            nowId: {
                    visible: true,
                    width: "80px"
                }
        }));
    });

    test('default settings have expected order', () => {
        expect(getDefaultUserSettings().order[0]).toEqual('position');
        expect(getDefaultUserSettings().order[4]).toEqual('adProvider');
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

    test('flat store with valid prop gets default with prop visibility', () => {
        let store= { ecpm: true };
        let newStore = migrateFlatObject(store);
        expect(newStore.settings).toEqual((expect.objectContaining({
            ecpm: { "visible": true, "width": "80px" }
        })));

        expect(newStore.order).toEqual((expect.arrayContaining([
            'position', 'ecpm'
        ])));

        expect(newStore.order.length).toEqual(27);
    });

    test('flat store with valid prop and version gets default with prop visibility', () => {
        let store= {version: '2.0.3', ecpm: true};
        let newStore = migrateFlatObject(store);
        expect(newStore.settings).toEqual((expect.objectContaining({
            ecpm: { "visible": true, "width": "80px" }
        })));
        expect(newStore.version).toEqual(currentVersion);
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


describe.skip('', () => {
    test('', () => {

        expect('').toEqual('');
    });
});