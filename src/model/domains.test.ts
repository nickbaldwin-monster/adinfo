import { domains } from './domains';



test('sanity', () => {
    expect(domains).toHaveProperty('en-US');
});


test('', () => {
    expect(domains['en-US']).toEqual('https://www.monster.com/jobs/');
});