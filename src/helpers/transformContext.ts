
import dayjs from 'dayjs';
import { DisplayRequest } from "../types/DisplayRequest";
import { JobQueryLocation, Request } from "../types/Request";





export const transformContext = (object: Request) => {
    if (!object) {
        return null;
    }

    let newObj = <DisplayRequest>{};
    for (const [k, v] of Object.entries(object)) {

        if (k === 'country') {
            newObj[k] = v;
        }
        if (k === 'language') {
            newObj[k] = v;
        }
        if (k === 'domain') {
            newObj[k] = v;
        }
        if (k === 'locale') {
            newObj[k] = v;
        }
        if (k === 'appVersion') {
            newObj[k] = v;
        }
        if (k === 'clientIP') {
            newObj[k] = v;
        }

        if (k === 'jobsList') {
            newObj.searchId = object[k].searchId || '';
            newObj.gctsReqId = object[k].gctsReqId || '';
            newObj.totalSize = '' +  object[k].totalSize;
            newObj.estimatedTotalSize = '' + object[k].estimatedTotalSize;
        }

        if (k === 'searchRequest') {

            const transformLocations = (locations: JobQueryLocation[]) => {

                // only one location
                let l = ''
                locations.forEach((loc: JobQueryLocation, i) => {
                    l +=
                    loc.address ? loc.address + ' : ' : ' ';
                    l += loc.country ? loc.country.toUpperCase()  : ' ';
                    l += loc.radius ? ' : ' + loc.radius?.value + ' ' : '';
                    l += loc.radius ? loc.radius?.unit : '';
                });
                return l;

            };

            let locations = object.searchRequest.jobQuery?.locations || [];
            let query = object.searchRequest.jobQuery?.query || 'n/a';
            newObj.searchRequest = '' + query + " : " + transformLocations(locations);
            newObj.fingerprintId = object.searchRequest.fingerprintId || '';
            newObj.placement = object.searchRequest.jobAdsRequest?.placement?.component || ''
        }


        if (k === 'jobAdsRequest') {
            // @ts-ignore
        }
    }

    return newObj;
}



