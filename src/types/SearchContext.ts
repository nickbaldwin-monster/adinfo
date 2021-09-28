export interface SearchContext  {
    client: {
        ipAddress: string,
        fingerprintId: string
    },
    software: {
        environment: string,
        releaseVersion: string,
        country: string,
        language: string,
        siteId: string,
        tenant: string,
        pageSize: number,
        host: string,
        originHost: string,
    },
    location: {
        currentLocation: string,
        currentPageName: string,
        searchId: string,
        urlParams: {
            q: string,
            where: string,
            page: string,
            geo: string,
            distributor: string[]
        }
    },
    user: {
        loginStatus: string,
        userId: string,
    }
}
