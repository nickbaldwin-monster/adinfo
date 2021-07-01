import { Job } from '../types/Job';
import { Provider }  from '../types/Provider';
import { Apply }  from '../types/Apply';
import { DisplayJob }  from '../types/DisplayJob';
import jobsList from "../sampleData/jobsList.json";


type AdProvider = 'Unknown' | "AdTech" | 'GCTS' | '';
type IngestionMethod = 'NOW' | 'JPW';
type PricingType = 'NOW Aggregated' | 'NOW Duration' | 'NOW PPC' | 'Next Free' | 'Next';
type ApplyType = '' | 'Onsite' | 'Offsite';




const normalizeAdProvider = (adProvider: object): AdProvider => {
    if (!adProvider){
        return '';
    }
    // todo
    // @ts-ignore
    if (adProvider.provider.toLowerCase().match(/ad*/)) {
        return 'AdTech';
    }
    // todo
    // @ts-ignore
    if (adProvider.provider.toLowerCase().match(/g*/)) {
        return 'GCTS';
    }
    return 'Unknown';
};

// todo - once know all values
const normalizeIngestionMethod = (ingestionMethod: string): string => {
    return ingestionMethod;
};

// todo - once know all values
const normalizePricingType = (now: object): string => {
    // @ts-ignore
    if (!now || !now.jobAdPricingTypeId) {
        return '';
    }
    // @ts-ignore
    return "" + now.jobAdPricingTypeId;
};

const normalizeMesco = (jobPosting: object): string => {
    // @ts-ignore
    if (!jobPosting || !jobPosting.occupationalCategory) {
        return '';
    }
    // @ts-ignore
    return jobPosting.occupationalCategory;
};


// todo
const formatDate = (date: string): string => {
    return date;
};


// todo
const transformProvider = (provider: Provider): string => {
    return provider?.name || '';
};

const transformProviderCode = (provider: Provider): string => {
    return provider?.code || '';
};

// todo
const transformApplyType = (applyType: Apply): string => {
    if (!applyType.applyType || applyType.applyType ==='') {
        return '';
    }
    return applyType.applyType;
};


// todo
export const isJob = (object: any): object is Job => {
    return true;
}

// todo
export const isDisplayJob = (object: any): object is DisplayJob => {
    return true;
}



export const transformJob = (object: object) => {
    if (!object || !isJob(object)) {
        return null;
    }

    let newObj = <DisplayJob>{};
    for (const [k, v] of Object.entries(object)) {
        if (k === 'jobId') {
            newObj[k] = v;
        }
        if (k === 'jobAd') {
            newObj.adProvider = normalizeAdProvider(v);
        }
        if (k === 'jobPosting') {
            newObj.mesco = normalizeMesco(v);
        }
        if (k === 'ingestionMethod') {
            newObj[k] = normalizeIngestionMethod(v);
        }

        if (k === 'now') {
            newObj.pricingType = normalizePricingType(v);

            // todo - now.jobAdPricingTypeId
        }

        if (k === 'formattedDate') {
            newObj[k] = formatDate(v);
        }
        if (k === 'dateRecency') {
            newObj[k] = v || '';
        }


        if (k === 'provider') {
            newObj[k] = transformProvider(v);
            newObj.providerCode = transformProviderCode(v);
        }
        if (k === 'apply') {
            // todo check
            newObj.applyType = transformApplyType(v);
        }
    }
    return newObj;
}

// @ts-ignore
export const transformJobs = (jobsList: object) => {

    // @ts-ignore
    if (!jobsList || !jobsList.jobResults) {
       return [];
   }

    let list = <DisplayJob[]> [];
    // @ts-ignore
    jobsList.jobResults.forEach( (job: object) => {
        // @ts-ignore
            list.push(transformJob(job));
    });

    return list;
};

