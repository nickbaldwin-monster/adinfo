export interface DisplayRequest  {
    country: string;
    language: string;
    domain: string;
    locale: string;
    appVersion: string;
    clientIP: string;
    searchId: string,
    fingerprintId: string,
    gctsReqId: string;
    searchRequest: string;
    placement: string;
    data: object;
    totalSize: string;
    estimatedTotalSize: string;
}

