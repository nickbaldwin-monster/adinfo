import {
    trJob,
    getAllProperties, getNamesOfDataSettings, getNamesOfJobProperties,
} from './dataModel';

import jobsList from '../sampleData/jobsList.json';
import impressionObject from '../sampleData/impressionObject.json';
import { getDataFromUrl } from "../helpers/decodeImpUrl";


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
});

test.skip('getNamesOfSettings is an array of names for all fields that can be displayed in table', () => {
    let fields = getNamesOfDataSettings();
    expect(fields).toEqual(
        expect.arrayContaining(["position", "decisionIndex", "remainder", "adProvider", "company", "title", "location", "nowId", "jobId", "template", "xCode", "applyType", "formattedDate", "mesco", "provider", "providerCode", "dateRecency", "ingestionMethod", "pricingType", "seoJobId", "refCode", "validThrough", "validThroughGoogle", "remote", "ecpm", "price", "decisionId"]
        )
    );
});

test('can access chained properties', () => {
    const job = jobsList.jobResults[0];
    // @ts-ignore
    let ad = job['jobAd']['provider'];
    expect(ad).toEqual('ADZERK');
});

test('can access imp properties', () => {
    const shim = impressionObject;
    // @ts-ignore
    let ecpm = shim.ec;
    expect(ecpm).toEqual(75.3324);
});



describe('trJob', () => {

    test('trJob - without position - position undefined', () => {
        const job = jobsList.jobResults[0];
        // @ts-ignore
        expect(trJob(job).position).toBe("");
    });

    test('trJob - with position - position defined', () => {
        const job = jobsList.jobResults[0];
        // @ts-ignore
        expect(trJob(job, "1").position).toEqual("1");
    });

    test('trJob - expected properties - with added items', () => {
        const job = jobsList.jobResults[0];
        let props = Object.keys(trJob(job, "5"));
        let propNames = getNamesOfJobProperties();
        expect(props).toEqual([
            ...propNames,
            'position',
            'selected',
            'data',
            'kevelData',
        ]);
    });


    test('trJob - job', () => {
        const job = jobsList.jobResults[0];
        expect(trJob(job, "1")).toMatchObject({
            adProvider: "ADZERK",
            applyType: "offsite",
            pricingType: "2",
            provider: "Virtusa",
            providerCode: "e1947c00-c36f-40ed-b1f3-0dafb93cbd4e",
            company: "Virtusa",
            dateRecency: "30+ days ago",
            formattedDate: "22 Apr 21",
            ingestionMethod: "ADAPTED_NOW",
            jobId: "db65fdbe-cba4-4ecb-8c56-a88f76cf6f93",
            location: "Boston, MA, US. ",
            mesco: "1500127001001",
            validThrough: "5 Sep 21",
            validThroughGoogle: "16 Jun 22",
            refCode: "CREQ62192",
            title: "Java Developer",
            template: "1",
            remote: "",
            xCode: "xcldincx",
            nowId: "230572257",
            url: "https://www.monster.com/job-openings/java-developer-boston-ma--db65fdbe-cba4-4ecb-8c56-a88f76cf6f93",
            seoJobId: "java-developer-boston-ma--db65fdbe-cba4-4ecb-8c56-a88f76cf6f93",
            position: '1',
            decisionId: "247cf20fbc6644bca6680c3579983c9e",
            decisionIndex: "0",
            ecpm: "30.5976",
            price: "1.1",
            remainder: "",

        });
    });


});



describe.skip('', () => {
    test('', () => {

        expect('').toEqual('');
    });
});