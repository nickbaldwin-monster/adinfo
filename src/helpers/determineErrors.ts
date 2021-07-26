import { Errors, ErrorItem, defaultErrors } from '../types/Errors';
import { DisplayJob } from "../types/DisplayJob";
import {Job} from "../types/Job";

export const determineErrors = (jobs: DisplayJob[]): Errors => {

    let errors: Errors = {
        message: 'No errors',
        number: 0,
        jobPositions: [],
        items: [],
        isError: false
    };

    let numberErrors = 0;
    let organicPositions: number[] = [];
    let adPositions: number[] = [];
    let lastAd = 0;
    jobs.forEach((job, i) => {
        if (job.adProvider === '') {
            organicPositions.push(i + 1);
        }
        else {
            // adPositions.push(i + 1);
            lastAd = i + 1;
        }
    });
    organicPositions.forEach((position: number) => {
        if (position < lastAd) {
            let error: ErrorItem = {
                message: 'Missing ad',
                jobPosition: position,
                detail: ''
            }
            numberErrors++;
            // @ts-ignore
            errors.jobPositions.push(position);
            // @ts-ignore
            errors.items.push(error);
        }
    });

    errors.number = numberErrors;
    if (numberErrors) {
        errors.isError = true;
        errors.message = `${numberErrors} errors`;
    }
    return errors;
};


