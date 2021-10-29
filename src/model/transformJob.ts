import { Job } from "../types/Job";
import { DisplayJob } from "../types/DisplayJob";
import { getDataFromUrl } from "../helpers/decodeImpUrl";
import { DataModel, getNamesOfJobProperties } from "./DataModel";
import dayjs from "dayjs";




// todo - this will provide augmented values
export const getImpressionData = (impressionUrl: string) => {

};



export const normalizePostLocation = (locations: object[]): string => {
    // @ts-ignore
    if (!locations || locations.length === 0 ) {
        return '';
    }

    let loc = '';
    // @ts-ignore
    locations.forEach((a: object) => {
        // @ts-ignore
        let add = a?.address;
        if (add) {
            // @ts-ignore
            // loc += add.addressLocality + ", " + add.addressRegion + ", " + add.postalCode + ", " + add.addressCountry + ". ";

            let thisLoc = [add.addressLocality, add.addressRegion, add.postalCode,add.addressCountry].filter(Boolean).join(", ");
            if (thisLoc) {
                thisLoc.concat('.');
                loc += thisLoc + '. ';
            }
        }

    });

    return loc;
}


export const formatDate = (date: string): string => {
    if (!date || date === '') {
        return '';
    }
    let d = dayjs(date).format('D MMM YY');
    return d || date;
};



export const nowAdIds = (object: object[]): string => {

    if (!object || object.length === 0) {
        return "";
    }
    return object
        // @ts-ignore
        .filter( (identity: object) => identity?.identifierName === 'POSITION_AD_ID')
        // @ts-ignore
        .map((identity: object) =>  identity.identifierValue)
        // @ts-ignore
        .join(", ") || "";
}





export const trJob = (job: Job, position: number) => {

    let obj: object = {};
    if (!job) {
        console.log('error - no job!')
        return obj;
    }

    let message = '';
    let kevelData = {};
    let impressionUrl = job?.jobAd?.tracking?.impressionUrl;
    if (job.jobAd && !impressionUrl) {
        message = 'error - no impression url for job ' + job.jobId;
    }
    else if (job.jobAd && impressionUrl) {
        kevelData = getDataFromUrl(impressionUrl || 'noUrl', job?.jobId);
    }

    // @ts-ignore
    if (job.jobAd && kevelData?.error) {
        message += "cannot decode impression url for job " + job.jobId;
    }
    if (message) {
        console.log(message);
    }


    // todo - keep list so do not do it every transform


    let list = getNamesOfJobProperties();

    list.forEach((propertyName: string) => {

        let srcProp = DataModel[propertyName]?.sourceProperty;
        let augProp = DataModel[propertyName]?.augmentedProperty;
        let func = DataModel[propertyName]?.transformProperty;
        if (srcProp) {
            if (func) {
                // @ts-ignore
                obj[propertyName] = func(job[srcProp]);
            }
            else {
                // @ts-ignore
                obj[propertyName] = job[srcProp];
            }
        }
        else if (augProp) {

            // @ts-ignore
            if (!kevelData) {
                // @ts-ignore
                obj[propertyName] = '';
            }
            /*
            else if (func) {
                // @ts-ignore
                obj[propertyName] = func(aug[augProp]);
            }

             */
            else {
                // @ts-ignore
                obj[propertyName] = kevelData[augProp];
            }
        }
        else {
            // @ts-ignore
            obj[propertyName] = "";
        }


    });

    // @ts-ignore
    obj.position = position;
    // @ts-ignore
    obj.selected = false;
    // @ts-ignore
    obj.data = job;
    // @ts-ignore
    obj.kevelData = kevelData;

    return obj;
}


export const transformJobsNew = (jobsList: object) => {

    // @ts-ignore
    if (!jobsList || !jobsList.jobResults) {
        return [];
    }

    let list = <DisplayJob[]> [];
    // @ts-ignore
    jobsList.jobResults.forEach( (job: object, _i: number) => {
        // @ts-ignore
        list.push(trJob(job, _i, job.jobAd?.tracking?.impressionUrl));
    });

    return list;
};


