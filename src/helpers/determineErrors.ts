import { Errors, ErrorItem, defaultErrors } from '../types/Errors';
import { DisplayJob } from "../types/DisplayJob";
import { Job } from "../types/Job";

export const determineErrors = (jobs: DisplayJob[]): Errors => {

    let errors: Errors = {
        message: 'No errors',
        number: 0,
        jobPositions: [],
        items: [],
        isError: false,
        numberAds: 0,
        numberOrganic: 0,
        numberTotal: 0,
        organicPositions: [],
        adPositions: []
    };

    let lastAd = 0;
    errors.numberTotal = jobs.length;
    jobs.forEach((job, i) => {
        if (!job.adProvider || job.adProvider === '') {
            errors.organicPositions.push(i + 1);
        }
        else {
            errors.adPositions.push(i + 1);
            lastAd = i + 1;
        }
    });

    // todo - potential error if last job is organic

    errors.organicPositions.forEach((position: number) => {
        if (position < lastAd) {
            let error: ErrorItem = {
                message: 'Missing ad',
                jobPosition: position,
                detail: ''
            }
            errors.number++;
            // @ts-ignore
            errors.jobPositions.push(position);
            // @ts-ignore
            errors.items.push(error);
        }
    });
    errors.numberAds = errors.adPositions.length;
    errors.numberOrganic = errors.organicPositions.length;

    if (errors.number) {
        errors.isError = true;
        errors.message = `${errors.number} error${errors.number > 1 ? 's' : ''}`;
    }

    if (errors.numberAds + errors.numberOrganic !== errors.numberTotal) {
        throw new Error('ERRORRRRRRR');
    }
    return errors;
};


