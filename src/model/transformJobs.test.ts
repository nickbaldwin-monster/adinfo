import {
    getAllProperties, getNamesOfDataSettings, getNamesOfJobProperties,
} from './DataModel';

import {
    trJob,
} from './transformJob';


import jobsList from '../sampleData/jobsList.json';
import impressionObject from '../sampleData/impressionObject.json';
import { getDataFromUrl } from "../helpers/decodeImpUrl";



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
        expect(trJob(job).position).toBe(undefined);
    });

    test('trJob - with position - position defined', () => {
        const job = jobsList.jobResults[0];
        // @ts-ignore
        expect(trJob(job, 1).position).toEqual(1);
    });

    test('trJob - expected properties - with added items', () => {
        const job = jobsList.jobResults[0];
        let props = Object.keys(trJob(job, 5));
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
        expect(trJob(job, 1)).toMatchObject({
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
            // description: "long string",
            template: "1",
            remote: "",
            xCode: "xcldincx",
            nowId: "230572257",
            url: "https://www.monster.com/job-openings/java-developer-boston-ma--db65fdbe-cba4-4ecb-8c56-a88f76cf6f93",
            seoJobId: "java-developer-boston-ma--db65fdbe-cba4-4ecb-8c56-a88f76cf6f93",
            position: 1,
            decisionId: "247cf20fbc6644bca6680c3579983c9e",
            adRank: 0,
            ecpm: "30.5976",
            price: "1.1"
        });
    });


});



describe.skip('', () => {
    test('', () => {

        expect('').toEqual('');
    });
});