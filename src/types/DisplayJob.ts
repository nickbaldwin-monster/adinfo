
// todo - move into model

export interface DisplayJob  {
    position: number;
    adRank: number;
    remainder: string; // todo - not being passed
    ecpm: string;
    price: string;
    adProvider: string;
    company: string;
    title: string;
    description: string;
    location: string;
    nowId: string;
    jobId: string;
    mesco: string;
    ingestionMethod: string; // IngestionMethod
    pricingType: string; // PricingType;
    formattedDate: string;
    dateRecency: string;
    provider: string;
    providerCode: string;
    applyType: string;
    xCode: string;
    data: object;
    seoJobId: string;
    template: string;
    url: string;
    refCode: string;
    validThrough: string;
    validThroughGoogle: string;
    remote: string;
    decisionId: string;
}