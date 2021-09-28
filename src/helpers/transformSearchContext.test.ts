import  { transformSearchContext, flattenToArray } from './transformSearchContext';
import data from '../sampleData/searchContext.json';


// sanity test
test('can transform simple object', () => {
    let exp = flattenToArray({a: 'foo', b: 'bar'});
    expect(exp).toEqual([
        {key: 'a', value: 'foo'},
        {key: 'b', value: 'bar'}
    ]);
});


test('can transform simple object with number', () => {
    let exp = flattenToArray({a: 'foo', b: 9});
    expect(exp).toEqual([
        {key: 'a', value: 'foo'},
        {key: 'b', value: '9'}
    ]);
});

test('can transform nested object with number', () => {
    let exp = flattenToArray({
        a: 'foo',
        b: 9,
        c: {
            d: 9,
            e: {
                f: 'bar'
            }
        }
    });
    expect(exp).toEqual([
        {key: 'a', value: 'foo'},
        {key: 'b', value: '9'},
        {key: 'd', value: '9'},
        {key: 'f', value: 'bar'},
    ]);
});


// sanity test
test('can access properties', () => {
    expect(data).toHaveProperty('client');
    expect(data).toHaveProperty('client');
});

test('only expected properties', () => {
    expect(data).not.toHaveProperty('blah');
});

test('when transformed, sample context should have x entries', () => {
    let t = transformSearchContext(data);
    expect(t).toEqual([
        {key: "ipAddress", value: "159.196.170.33"},
        {key: "fingerprintId", value: "1a1ea79f-affa-4c0f-b580-773b31848e89"},
        {key: "environment", value: "prod"},
        {key: "releaseVersion", value: "0.0.427"},
        {key: "country", value: "us"},
        {key: "language", value: "en"},
        {key: "siteId", value: "monster.com"},
        {key: "tenant", value: "monster"},
        {key: "pageSize", value: "9"},
        {key: "host", value: "www.monster.com"},
        {key: "originHost", value: "www.monster.com"},
        {key: "currentLocation", value: "/jobs/search?q=Software+Engineer&where=Boston,+MA&page=8&geo="},
        {key: "currentPageName", value: "results"},
        {key: "searchId", value: "8ad553cd-48f1-4f9f-9506-17d5de20c588"},
        {key: "q", value: "Software Engineer"},
        {key: "where", value: "Boston, MA"},
        {key: "page", value: "8"},
        {key: "geo", value: ""},
        {key: "loginStatus", value: "logged out - recognized"},
        {key: "userId", value: "3f7c02f4-d1e3-4de1-95f5-532b15b39eb9"}
    ]);
    expect(t.length).toEqual(20);
});




