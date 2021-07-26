import { Errors, ErrorsSchema, ErrorItem, defaultErrors, isErrorItem, isErrors, ErrorsKey, ErrorItemKey}
    from '../types/Errors';
import { determineErrors } from './determineErrors';
import {DisplayJob} from '../types/DisplayJob';


const job1: DisplayJob =  {
    position: 1,
    title: 'job1',
    company: 'company1',
    jobId: '1',
    location: '',
    adProvider: 'ADZERK',
    mesco: '1',
    ingestionMethod: '1',
    pricingType: '1',
    formattedDate: '1',
    dateRecency: '1',
    provider: '1',
    providerCode: '1',
    applyType: 'on',
    xCode: '1',
    data: {},
    seoJobId: '1'
};
const job2: DisplayJob =  {
    position: 2,
    title: 'job2',
    company: 'company2',
    jobId: '2',
    location: '',
    adProvider: 'ADZERK',
    mesco: '1',
    ingestionMethod: '1',
    pricingType: '1',
    formattedDate: '1',
    dateRecency: '1',
    provider: '1',
    providerCode: '1',
    applyType: 'on',
    xCode: '1',
    data: {},
    seoJobId: '1'
}
const job3: DisplayJob =  {
    position: 3,
    title: 'job3',
    company: 'company3',
    jobId: '3',
    location: '',
    adProvider: '',
    mesco: '1',
    ingestionMethod: '1',
    pricingType: '1',
    formattedDate: '1',
    dateRecency: '1',
    provider: '1',
    providerCode: '1',
    applyType: 'on',
    xCode: '1',
    data: {},
    seoJobId: '1'
}
const job4: DisplayJob =  {
    position: 4,
    title: 'job4',
    company: 'company4',
    jobId: '4',
    location: '',
    adProvider: 'ADZERK',
    mesco: '1',
    ingestionMethod: '1',
    pricingType: '1',
    formattedDate: '1',
    dateRecency: '1',
    provider: '1',
    providerCode: '1',
    applyType: 'on',
    xCode: '1',
    data: {},
    seoJobId: '1'
}

const job5: DisplayJob =  {
    position: 5,
    title: 'job5',
    company: 'company4',
    jobId: '5',
    location: '',
    adProvider: '',
    mesco: '1',
    ingestionMethod: '1',
    pricingType: '1',
    formattedDate: '1',
    dateRecency: '1',
    provider: '1',
    providerCode: '1',
    applyType: 'on',
    xCode: '1',
    data: {},
    seoJobId: '1'
}


let
noErrors = {
    message: 'No errors',
    number: 0,
    jobPositions: [],
    items: [],
    isError: false
};


let error;
let jobs;

beforeEach(() => {
    error = null;
    jobs = null;
});


test('create Errors - 1 ad - no errors', () => {
    let jobs: DisplayJob[] = [{...job1}];
    let error = determineErrors(jobs);
    expect(error).toEqual(noErrors);
});

test('create Errors - 1 organic - no errors', () => {
    let jobs: DisplayJob[] = [{...job3}];
    let error = determineErrors(jobs);
    expect(error).toEqual(noErrors);
});

test('create Errors - 2 ads - no errors', () => {
    let jobs: DisplayJob[] = [{...job1}, {...job2}];
    let error = determineErrors(jobs);
    expect(error).toEqual(noErrors);
});

test('create Errors - 1 ad & 1 organic - no errors', () => {
    let jobs: DisplayJob[] = [{...job1}, {...job3}];
    let error = determineErrors(jobs);
    expect(error).toEqual(noErrors);
});

test('create Errors - 2 ads & 1 organic - no errors', () => {
    let jobs: DisplayJob[] = [{...job1}, {...job2}, {...job3}];
    let error = determineErrors(jobs);
    expect(error).toEqual(noErrors);
});

test('create Errors - 2 ads & 1 organic & 1 ad - 1 error', () => {
    let jobs: DisplayJob[] = [{...job1}, {...job2}, {...job3}, {...job4}];
    let error = determineErrors([...jobs]);
    let exp = {
        message: '1 errors',
        number: 1,
        jobPositions: [3],
        items: [{
            message: 'Missing ad',
            jobPosition: 3,
            detail: ''
        }],
        isError: true
    }

    expect(error).toEqual(exp);

});

test('create Errors - 1 organic & 2 ads - 1 error', () => {
    const jobs: DisplayJob[] = [{...job3}, {...job1}, {...job2}];
    const error = determineErrors(jobs);
    const exp = {
        message: '1 errors',
        number: 1,
        jobPositions: [1],
        items: [{
            message: 'Missing ad',
            jobPosition: 1,
            detail: ''
        }],
        isError: true
    }
    expect(error).toEqual(exp);
});

test('create Errors - 1 ad & 1 organic & 1 ad & 1 organic & 1 ad - 2 errors', () => {
    let jobs: DisplayJob[] = [{...job1}, {...job3}, {...job2}, {...job5}, {...job4}];
    let error = determineErrors(jobs);
    const exp = {
        message: '2 errors',
        number: 2,
        jobPositions: [2, 4],
        items: [
            {
                message: 'Missing ad',
                jobPosition: 2,
                detail: ''
            },
            {
                message: 'Missing ad',
                jobPosition: 4,
                detail: ''
            }],
        isError: true
    }
    expect(error).toEqual(exp);
});

test('create Errors - 1 ad & 2 organic & 1 ad - 2 errors', () => {
    let jobs: DisplayJob[] = [job1, job3, job5, job2, job4];
    let error = determineErrors(jobs);
    const exp = {
        message: '2 errors',
        number: 2,
        jobPositions: [2, 3],
        items: [
            {
                message: 'Missing ad',
                jobPosition: 2,
                detail: ''
            },
            {
                message: 'Missing ad',
                jobPosition: 3,
                detail: ''
            }],
        isError: true
    }
    expect(error).toEqual(exp);
});
