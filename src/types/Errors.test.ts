import { Errors, ErrorsSchema, ErrorItem, defaultErrors, isErrorItem, isErrors, ErrorsKey, ErrorItemKey}
    from './Errors';


// sanity check
test('can access properties of defaultErrors', () => {
    expect(defaultErrors).toHaveProperty('message');
});

test('defaultSettings has many properties', () => {
    expect(defaultErrors).toHaveProperty('isError');
    expect(defaultErrors).toHaveProperty('jobPositions');
});

// tests

test('isErrors - defaultErrors', () => {
    expect(isErrors(defaultErrors)).toBeTruthy();
});

test('isErrors - valid settings', () => {
    let s = {...defaultErrors, message: false};
    expect(isErrors(s)).toBeTruthy();
});


test('isErrors - additional property valid', () => {
    let s = {...defaultErrors, foo: true};
    expect(isErrors(s)).toBeTruthy();
});

test('isErrors - missing a property', () => {
    let s = {...defaultErrors};
    // @ts-ignore
    delete s.message;
    expect(isErrors(s)).toBeFalsy();
});

test('isErrorItem - valid property', () => {
    expect(isErrorItem('message')).toBeTruthy();

});

test('isErrorItem - invalid property', () => {
    expect(isErrorItem('foo')).toBeFalsy();
});

test('default properties matches schema', () => {
    let schemaProperties = Object.keys(ErrorsSchema);
    let defaultProperties = Object.keys(defaultErrors);
    expect(schemaProperties).toStrictEqual(defaultProperties)
});


test('create Errors', () => {

});

test('Error created from missing ad', () => {

});
