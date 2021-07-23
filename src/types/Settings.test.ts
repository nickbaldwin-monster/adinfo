import {Settings, SettingsSchema, defaultSettings, isSetting, isSettings, SettingsKey} from './Settings';


// sanity check
test('can access properties of defaultSettings', () => {
    expect(defaultSettings).toHaveProperty('title');
});

test('defaultSettings has many properties', () => {
    expect(defaultSettings).toHaveProperty('company');
    expect(defaultSettings).toHaveProperty('xCode');
});

// tests

test('isSettings - defaultSettings', () => {
    expect(isSettings(defaultSettings)).toBeTruthy();
});

test('isSettings - valid settings', () => {
    let s = {...defaultSettings, title: false};
    expect(isSettings(s)).toBeTruthy();
});

test('isSettings - additional property invalid (boolean)', () => {
    let s = {...defaultSettings, foo: 'bar'};
    expect(isSettings(s)).toBeFalsy();
});

test('isSettings - additional property valid (boolean)', () => {
    let s = {...defaultSettings, foo: true};
    expect(isSettings(s)).toBeTruthy();
});

test('isSettings - missing a property', () => {
    let s = {...defaultSettings};
    // @ts-ignore
    delete s.title;
    expect(isSettings(s)).toBeFalsy();
});

test('isSetting - valid property', () => {
    expect(isSetting('title')).toBeTruthy();

});

test('isSetting - invalid property', () => {
    expect(isSetting('foo')).toBeFalsy();
});

test('default properties matches schema', () => {
    let schemaProperties = Object.keys(SettingsSchema);
    let defaultProperties = Object.keys(defaultSettings);
    expect(schemaProperties).toStrictEqual(defaultProperties)
});