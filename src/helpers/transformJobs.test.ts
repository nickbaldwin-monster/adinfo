import {transformJobs, transformJob, isJob, isDisplayJob} from './transformJobs';

import jobsList from '../sampleData/jobsList.json';
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

test.skip('isJob works - ', () => {
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

test.skip('raw job IS a raw job', () => {
    let job = jobsList.jobResults[0];
    expect(isJob(job)).toBeTruthy();
});

test('transformed job has expected properties', () => {
    let job = jobsList.jobResults[0];
    let newJob = transformJob(job, 0);
    expect(newJob).toHaveProperty('position');
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
    expect(newJob).toHaveProperty('company');
    expect(newJob).toHaveProperty('title');
    expect(newJob).toHaveProperty('location');
    expect(newJob).toHaveProperty('xCode');
    expect(newJob).toHaveProperty('data');
    expect(newJob).toHaveProperty('nowId');
    expect(newJob).toHaveProperty('template');
});

test('transformed job has correct values for props', () => {
    let job = jobsList.jobResults[0];
    let newJob = transformJob(job,0 );

    // @ts-ignore
    newJob.data = {};

    expect(newJob).toEqual({
        position: 1,
        jobId: 'db65fdbe-cba4-4ecb-8c56-a88f76cf6f93',
        adProvider: 'ADZERK',
        mesco: '1500127001001',
        ingestionMethod: 'Adapted NOW',
        pricingType: '2',
        formattedDate: '22 Apr 21',
        dateRecency: '30+ days ago',
        provider: 'Virtusa',
        providerCode: 'e1947c00-c36f-40ed-b1f3-0dafb93cbd4e',
        applyType: 'offsite',
        company: 'Virtusa',
        location: 'Boston, MA, , US. ',
        title: 'Java Developer',
        xCode: 'n/a',
        selected: false,
        seoJobId: 'java-developer-boston-ma--db65fdbe-cba4-4ecb-8c56-a88f76cf6f93',
        data: {},
        nowId: '274756999',
        template: '1'


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
    // todo
    list[0].data = {};
    expect(list).toEqual(
        [
            {
                position: 1,
                jobId: 'db65fdbe-cba4-4ecb-8c56-a88f76cf6f93',
                adProvider: 'ADZERK',
                mesco: '1500127001001',
                ingestionMethod: 'Adapted NOW',
                pricingType: '2',
                formattedDate: '22 Apr 21',
                dateRecency: '30+ days ago',
                provider: 'Virtusa',
                providerCode: 'e1947c00-c36f-40ed-b1f3-0dafb93cbd4e',
                applyType: 'offsite',
                company: 'Virtusa',
                location: 'Boston, MA, , US. ',
                title: 'Java Developer',
                xCode: 'n/a',
                seoJobId: 'java-developer-boston-ma--db65fdbe-cba4-4ecb-8c56-a88f76cf6f93',
                selected: false,
                data: {},
                nowId: '274756999',
                template: '1'

            }
        ]
    );
});