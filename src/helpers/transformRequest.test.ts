import { transformRequest } from './transformRequest';

import savedReduxState from '../sampleData/savedReduxState.json';



test('can access properties', () => {
    expect(savedReduxState).toHaveProperty('country');
});

test('transformed request has expected properties', () => {
    let req = transformRequest(savedReduxState);
    expect(req).toHaveProperty('country');
    expect(req).toHaveProperty('language');
    expect(req).toHaveProperty('domain');
    expect(req).toHaveProperty('locale');
    expect(req).toHaveProperty('clientIP');
    expect(req).toHaveProperty('fingerprintId');
    expect(req).toHaveProperty('searchId');
    expect(req).toHaveProperty('gctsReqId');
    expect(req).toHaveProperty('appVersion');
    expect(req).toHaveProperty('totalSize');
    expect(req).toHaveProperty('estimatedTotalSize');
    expect(req).toHaveProperty('searchRequest');
    expect(req).toHaveProperty('placement');
    expect(req).toHaveProperty('data');
});

test('transformed request has expected values', () => {
    let req = transformRequest(savedReduxState);
    // @ts-ignore
    req.data = {};

    expect(req).toEqual({
        country: 'us',
        language: 'en',
        domain: 'www.monster.com',
        locale: 'en-US',
        appVersion: '0.2.1',
        clientIP: '121.200.2.238',
        searchId: 'aa43aa98-cba0-4e64-8ac6-93a79c73475a',
        fingerprintId: '3a1883da70a65bc340eb5aeea161cddd',
        gctsReqId: '7e1ea752-cf18-40cb-a90e-999c98cc64cd:APAb7IRsamN7HtIROjkxcyhKKZE6q4sivw==',
        searchRequest: 'Software Engineer : Boston, MA : US : 20 mi',
        placement: 'JSR_LIST_VIEW',
        data: {},
        totalSize: '10',
        estimatedTotalSize: '6772',
    });
});


