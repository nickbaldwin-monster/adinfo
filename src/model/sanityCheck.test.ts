import jobsList from '../sampleData/jobsList.json';

// sanity checks

describe('sanity check - json', () => {

    test('can access properties', () => {
        expect(jobsList).toHaveProperty('estimatedTotalSize');
    });
    test('can access job property', () => {
        let job = jobsList.jobResults[0];
        expect(job).toHaveProperty('jobId');
    });

    test('raw job has lots of properties', () => {
        let job = jobsList.jobResults[0];
        expect(job).toHaveProperty('externalIdentifiers');
        expect(job).toHaveProperty('jobPosting');
        expect(job).toHaveProperty('brandingExt');
    });

    test('can access chained properties', () => {
        const job = jobsList.jobResults[0];
        // @ts-ignore
        let ad = job['jobAd']['provider'];
        expect(ad).toEqual('ADZERK');
    });

});





describe('', () => {
    test('', () => {

        expect('').toEqual('');
    });
});