export interface Request  {
    country: string;
    language: string;
    domain: string;
    locale: string;
    appVersion: string;
    clientIP: string;
    jobsList: {
        searchId: string,
        gctsReqId: string;
        totalSize: number;
        estimatedTotalSize: number;
    };

    searchRequest: {
        jobQuery: {
            locations: JobQueryLocation[];
            query: string;
        };
        fingerprintId: string;
        jobAdsRequest: {
            placement: {
                component: string
            };
        };
    };


}



export interface JobQueryLocation {
    address?: string;
    country?: string;
    radius?: {
        unit: string;
        value: string;
    }
}
