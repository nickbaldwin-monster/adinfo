import { Job } from '../types/Job';
import { Provider }  from '../types/Provider';
import { Apply }  from '../types/Apply';
import { DisplayJob }  from '../types/DisplayJob';
import jobsList from "../sampleData/jobsList.json";
import dayjs from 'dayjs';

type AdProvider = 'Unknown' | "AdTech" | 'GCTS' | 'GCTS AdQuery' | '';
type IngestionMethod = 'Adapted NOW' | 'JPW';
type PricingType = 'NOW Aggregated' | 'NOW Duration' | 'NOW PPC' | 'Next Free' | 'Next';
type ApplyType = '' | 'Onsite' | 'Offsite';




const normalizeAdProvider = (adProvider: object): AdProvider => {
    if (!adProvider){
        return '';
    }
    // todo

    // @ts-ignore
    if (adProvider.provider.toLowerCase().match(/gcts_ad*/)) {
        return 'GCTS AdQuery';
    }
    // @ts-ignore
    if (adProvider.provider.toLowerCase().match(/ad*/)) {
        return 'AdTech';
    }
    // @ts-ignore
    if (adProvider.provider.toLowerCase().match(/g*/)) {
        return 'GCTS';
    }
    return 'Unknown';
};

// todo - once know all values
const normalizeIngestionMethod = (ingestionMethod: string): string => {
    if (ingestionMethod === 'ADAPTED_NOW') {
        return 'Adapted NOW';
    }
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



const normalizePostCompany = (jobPosting: object): string => {
    // @ts-ignore
    if (!jobPosting || !jobPosting.hiringOrganization || !jobPosting.hiringOrganization.name) {
        return '';
    }

    // @ts-ignore
    return jobPosting.hiringOrganization.name;

}

const normalizePostTitle = (jobPosting: object): string => {
    // @ts-ignore
    if (!jobPosting || !jobPosting.title) {
        return '';
    }
    // @ts-ignore
    return jobPosting.title;

}

const normalizePostLocation = (jobPosting: object): string => {
    // @ts-ignore
    if (!jobPosting || !jobPosting.jobLocation ) {
        return '';
    }

    let loc = '';
    // @ts-ignore
    jobPosting.jobLocation.forEach((a: object) => {
        // @ts-ignore
        let add = a?.address;
        if (add) {
            // @ts-ignore
            loc += add.addressLocality + ", " + add.addressRegion + ", " + add.postalCode + ", " + add.addressCountry + ". ";
        }

    });

    return loc;
}




// todo
const formatDate = (date: string): string => {
    let d = dayjs(date).format('D MMM YY');
    return d || date;
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
    return applyType.applyType.toLowerCase();
};


// todo
export const isJob = (object: any): object is Job => {
    return true;
}

// todo
export const isDisplayJob = (object: any): object is DisplayJob => {
    return true;
}



export const transformJob = (object: object, i: number) => {
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



        if (k === 'seoJobId') {
            newObj.seoJobId = v;
        }

        if (k === 'jobPosting') {
            // todo check
            newObj.title = normalizePostTitle(v);
            newObj.company = normalizePostCompany(v);
            newObj.location = normalizePostLocation(v);
        }

        if (k === 'enrichments') {
            // todo check
            // normalizeEnrichedTitle(v, newObj.title);
            // normalizeEnrichedCompany(v, newObj.company);
            // normalizeEnrichedLocation(v, newObj.location);

            // @ts-ignore
            newObj.xCode = object[k].companyKb?.code ?? 'n/a';

            /*
            if (newObj.pricingType && newObj.pricingType === '3') {
                if (monsterCountryCode !== 'us' && monsterCountryCode !== 'ca') {
                newObj.xCode = 'aggregated';
                }
            }
            */


        }





    }

    // decorating job with additional properties needed for display in the table
    // @ts-ignore
    newObj.selected = false;
    newObj.data = object;
    newObj.position = i + 1;

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
    jobsList.jobResults.forEach( (job: object, i: number) => {
        // @ts-ignore
            list.push(transformJob(job, i));
    });

    return list;
};

