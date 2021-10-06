import {
    trJob,
    getAllProperties, getNamesOfSettings, getJobProperties,
} from './model';

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

test('getNamesOfSettings is an array of names for all fields that can be displayed in table', () => {
    let fields = getNamesOfSettings();
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
        expect(trJob(job).position).toBeNaN();
    });

    test('trJob - with position - position defined', () => {
        const job = jobsList.jobResults[0];
        // @ts-ignore
        expect(trJob(job, 1).position).toEqual(2);
    });

    test('trJob - expected properties - with added items', () => {
        const job = jobsList.jobResults[0];
        let props = Object.keys(trJob(job));
        let propNames = getJobProperties();
        expect(props).toEqual([
            ...propNames,
            'position',
            'selected',
            'data',
            'kevelData',
        ]);
    });


    test('trJob - job with no aug', () => {
        const job = jobsList.jobResults[0];
        expect(trJob(job, 1)).toEqual(
            expect.objectContaining({
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


            // will not have values - until aug passed
            decisionId: "",
            decisionIndex: "",
            ecpm: "",
            price: "",
            remainder: ""
        }));
    });


    test('trJob - job with aug', () => {
        const job = jobsList.jobResults[0];
        const url = "https://prod.monsterview.com/i.gif?e=eyJ2IjoiMS45IiwiYXYiOjE2MjY1MjEsImF0IjoxNjIsImJ0IjowLCJjbSI6MzIwNjk1MTMsImNoIjo1MDQ3NSwiY2siOnt9LCJjciI6NDgyNDA4ODIsImRpIjoiYmFkOWNjZGI4OTU0NGQwMGI0MDExZjA4M2JkZDY2ZmEiLCJkaiI6MiwiaWkiOiJjMGM5Y2E3NDhmMTk0MjVhYmRiMWE5NTlhMGNkNzQ2MCIsImRtIjozLCJmYyI6NzM1Njk5OTQsImZsIjo2NTY3OTYzMiwiaXAiOiIxMDcuMjIuMjUxLjIxNSIsIm53IjoxMDUxNSwicGMiOjEuMTgsImRwIjozNS41Nzc5OTk5OTk5OTk5OTYsImRuIjozNS41Nzc5OTk5OTk5OTk5OTYsImRnIjozNS41Nzc5OTk5OTk5OTk5OTYsImVjIjo0MS43MTUzNiwiZ20iOjAsImVwIjpudWxsLCJwciI6MjE3OTEzLCJydCI6MywicnMiOjUwMCwic2EiOiJ1bmRlZmluZWQiLCJzYiI6ImktMGYyZTdhYWUzYzExZTE1MTUiLCJzcCI6MzgzNDc4OSwic3QiOjExMjk3MTIsInVrIjoiMWExZWE3OWYtYWZmYS00YzBmLWI1ODAtNzczYjMxODQ4ZTg5IiwidHMiOjE2MzMxNTg2MDkyMjgsInBuIjoibW9uc3RlcjpKU1JfU1BMSVRfVklFVyIsImdjIjp0cnVlLCJnQyI6dHJ1ZSwiZ3MiOiJub25lIiwiYmkiOjEsInR6IjoiVVRDIiwiYmEiOjQxLCJmcSI6MH0&s=TL1CIallRX846ACDHR9-zSQuIhY&property%3Aaid=ffd67fadfdd4a389b63ed608af877db5&property%3Aapp=monster&property%3Acname=Senior+Engineer%2C+Software+Engineering&property%3Acsrc=ppc.now&property%3Acmp=JSR_SPLIT_VIEW&property%3Acur=USD&property%3Aexr=1.0&property%3Ajid=c5787828-a7f2-449a-84a9-4936d8990628&property%3Ajloc=%5B%7B%22city%22%3A%22Boston%22%2C%22state%22%3A%22MA%22%2C%22country%22%3A%22US%22%2C%22zipcode%22%3A%2202112%22%2C%22latitude%22%3A%2242.336%22%2C%22longitude%22%3A%22-71.018%22%7D%5D&property%3Ajmsc=1500127001001&property%3Ajtit=Senior+Engineer%2C+Software+Engineering&property%3Asid=a9b4cff9-ea5e-45bb-a38e-56c22958cfd1&property%3Alat=39.0481&property%3Alng=-77.4728&property%3Apcd=capitalmarketsftpin&property%3Aua=Java-http-client%2F11.0.12&property%3Arip=107.22.251.215&property%3Asname=Web&property%3Asdate=2021-10-02T04%3A40%3A26.633&property%3Aac=US&property%3Aap=GCTS_ADQUERY&property%3Azip=511&property%3Asp=Software+Engineer&property%3Asl=Boston%2C+MA%23%2F";
        const aug = getDataFromUrl(url, 'fake-id-for-test');
        expect(trJob(job, 1, aug)).toEqual(
            expect.objectContaining({
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

            decisionId: "bad9ccdb89544d00b4011f083bdd66fa",
            decisionIndex: "2",
            price: "1.18",
            remainder: "",
            ecpm: "41.71536",


            position: 2,
            selected: false

        }));
    });

});



describe.skip('', () => {
    test('', () => {

        expect('').toEqual('');
    });
});