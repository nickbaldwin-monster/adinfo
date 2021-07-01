
import { Provider }  from './Provider';


export interface Job {
    schemaVersion: string,
    jobId: string;
    externalIdentifiers?: {
        identifierName?: string;
        identifierValue?: string;
    }[];
    status?: string;
    jobPosting: {
        description?: string;
        url?: string;
        datePosted?: string;
        hiringOrganization?: {
            description?: string;
            url?: string;
            name?: string;
        };
        identifier?: {
            name: string;
            value: string;
        };
        industry?: string;
        jobLocation?: {
            address?: {
                addressLocality: string;
                addressRegion: string;
                postalCode: string;
                addressCountry: string;
            };
            geo?: {
                latitude: string;
                longitude: string;
            };
        }[];
        occupationalCategory?: string;
        title?: string;
    };
    createdDate: string;
    provider?: Provider;
    apply: {
        applyType: string;
        applyUrl?: string;
    };
    ingestionMethod: string;
    enrichments?: {
        language?: {
            languageCode: string;
        };
        mescos?: {
            id:  string;
        }[];
        normalizedJobLocations?: {
            postalAddress?: {
                address?: {
                    addressLocality:  string;
                    addressRegion:  string;
                    addressCountry:  string;
                };
                geo?: {
                    latitude:  string;
                    longitude:  string;
                };
            };
            locationId?:  string;
            countryCode:  string;
        }[];
        companyKb?: {
            normalizedCompanyName:  string;
            normalizedCompanyGuid:  string;
        };
        normalizedTitles?: {
            title:  string;
        }[];
        normalizedSalary?: {
            currencyCode?: {
                name: string;
                id: number;
            };
            salaryBaseType?: {
                name: string;
                id: number;
            };
        };
        employmentTypes?: {
            name: string;
            id: number;
        }[];
        employmentTypeModifiers?: {
            name: string;
            id: number;
        }[];
        status?: {
            name: string;
            id: number;
        };
        applyType?: {
            name: string;
            id: number;
        };
        ingestionMethod?: {
            name: string;
            id: number;
        };
        localizedMonsterUrls?: {
            locationId: string,
            url: string
        }[];
        qualifiedForG4J?: boolean;
        isPublicJob?: boolean;
        googleSyntheticValidThrough?: string;
    };
    attributeValuePairs?: {
        name: string;
        value: string;
    }[];
    now?: {
        jobAdPricingTypeId: number;
    };
    formattedDate: string;
    dateRecency?: string;
    seoJobId?: string;
    fieldTranslations?: any[]; //?
    jobAd?: {
        type: string;
        provider: string;
        tracking: {
            clickUrl: string;
            impressionUrl: string;
        };
    };
    brandingExt?: {
        companyBannerUrl?: string;
        companyPhotos?: any[]; //?
        companyBenefits?: any[]; //?
    };
    bespokeJob?: boolean,
    _gctsid?: string;
    _searchid?: string;
    hasValidCompanyLogo?: object;

}