export interface Settings {
    title: boolean;
    company: boolean;
    jobId: boolean;
    location: boolean;
    adProvider: boolean;
    mesco: boolean;
    ingestionMethod: boolean;
    pricingType: boolean;
    formattedDate: boolean;
    dateRecency: boolean;
    provider: boolean;
    providerCode: boolean;
    applyType: boolean;
    xCode: boolean;
    seoJobId: boolean;
}

export const SettingsSchema: Record<keyof Settings, string> = {
    title: 'boolean',
    company: 'boolean',
    jobId: 'boolean',
    location: 'boolean',
    adProvider: 'boolean',
    mesco: 'boolean',
    ingestionMethod: 'boolean',
    pricingType: 'boolean',
    formattedDate: 'boolean',
    dateRecency: 'boolean',
    provider: 'boolean',
    providerCode: 'boolean',
    applyType: 'boolean',
    xCode: 'boolean',
    seoJobId: 'boolean'
};

interface SettingProperty {
    [key: string]: boolean;
}

export const isSetting = (input: string): boolean => {
    if (input !== '' && input in SettingsSchema) {
        return true;
    }
    return false;
}

export const isSettings = (input: any): input is Settings => {
    if ( !input  || input === {}) {
        return false;
    }

    let errors = 0;
    // @ts-ignore
    Object.values(input).forEach((value) => {
        if (typeof value !== 'boolean') {
            errors++;
        }
    })
    if (errors > 0) { return false};

    const missingProperties = Object.keys(SettingsSchema)
        .filter(key => input[key] === undefined)
        .map(key => key as keyof Settings)
        .map(key => new Error(`Document is missing ${key} ${SettingsSchema[key]}`));

    // throw the errors if you choose

    return missingProperties.length === 0;
}

export const defaultSettings = {
    title: true,
    company: true,
    jobId: false,
    location: true,
    adProvider: true,
    mesco: true,
    ingestionMethod: true,
    pricingType: true,
    formattedDate: true,
    dateRecency: true,
    provider: true,
    providerCode: true,
    applyType: true,
    xCode: true,
    seoJobId: false
};