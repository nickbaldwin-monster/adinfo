export interface Context  {
    client: {
        ipAddress: string;
        fingerprintId: string;
    };
    software: {
        environment: string;
        country: string;
        language: string;
        siteId: string;
        tenant: string;
        pageSize: number;
    };
    location: {
        currentLocation: string;
        currentPageName: string;
    };
    user: {
        loginStatus: string;
    };
    context: {
        client: {
            ipAddress: string;
            fingerprintId: string;
        };
    };
    userEventData: {
        searchId: string;
    };
}
