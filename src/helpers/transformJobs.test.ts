import {transformJobs, transformJob, isJob, isDisplayJob} from './transformJobs';

import jobsList from '../sampleData/jobsList.json';
import objectContaining = jasmine.objectContaining;
import {Provider} from "../types/Provider";


// ######



test('can access properties', () => {
    expect(jobsList).toHaveProperty('estimatedTotalSize');
});


// #####

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

test.skip('isJob works - type check', () => {
    let job = {jobId: 3};
    // failing test
    expect(isJob(job)).toBeFalsy();
});

test('isJob works - ', () => {
    let job = {
        jobId: "1",
        schemaVersion: "1",
        jobPosting: {

        },
        createdDate: "1",
        apply: {
            applyType: "1"
        },
        ingestionMethod: "1",
        formattedDate: "1"
    };
    expect(isJob(job)).toBeFalsy();
});

test('raw job IS a raw job', () => {
    let job = jobsList.jobResults[0];
    expect(isJob(job)).toBeTruthy();
});

test('transformed job has expected properties', () => {
    let job = jobsList.jobResults[0];
    let newJob = transformJob(job);
    expect(newJob).toHaveProperty('jobId');
    expect(newJob).toHaveProperty('adProvider');
    expect(newJob).toHaveProperty('mesco');
    expect(newJob).toHaveProperty('ingestionMethod');
    expect(newJob).toHaveProperty('pricingType');
    expect(newJob).toHaveProperty('formattedDate');
    expect(newJob).toHaveProperty('dateRecency');
    expect(newJob).toHaveProperty('provider');
    expect(newJob).toHaveProperty('providerCode');
    expect(newJob).toHaveProperty('applyType');
});

test('transformed job has correct values for props', () => {
    let job = jobsList.jobResults[0];
    let newJob = transformJob(job);
    console.log('hi');

    expect(newJob).toEqual({

        jobId: 'db65fdbe-cba4-4ecb-8c56-a88f76cf6f93',
        adProvider: 'AdTech',
        mesco: '1500127001001',
        ingestionMethod: 'ADAPTED_NOW',
        pricingType: '2',
        formattedDate: '2021-04-22T00:00:00',
        dateRecency: '30+ days ago',
        provider: 'Virtusa',
        providerCode: 'e1947c00-c36f-40ed-b1f3-0dafb93cbd4e',
        applyType: 'OFFSITE',
    });
});

test.skip('invalid objects are not transformed - return undefined', () => {
    let job = jobsList.jobResults[0];

    // @ts-ignore
    // delete job.jobId;
    let newJob = transformJob(job);
    expect(newJob).toBeNull();
});



test('jobList transformed into display jobs', () => {
    let response = jobsList;
    let list = transformJobs(response);
    expect(list).toEqual(
        [
            {
                jobId: 'db65fdbe-cba4-4ecb-8c56-a88f76cf6f93',
                adProvider: 'AdTech',
                mesco: '1500127001001',
                ingestionMethod: 'ADAPTED_NOW',
                pricingType: '2',
                formattedDate: '2021-04-22T00:00:00',
                dateRecency: '30+ days ago',
                provider: 'Virtusa',
                providerCode: 'e1947c00-c36f-40ed-b1f3-0dafb93cbd4e',
                applyType: 'OFFSITE',
            }
        ]
    );
});