
export interface Settings {
    adProvider: boolean;
    ingestionMethod: boolean;
    pricingType: boolean;
    applyType: boolean;
    location: boolean;
    dateRecency: boolean;
    formattedDate: boolean;
    xCode: boolean;
    company: boolean;
    title: boolean;
    mesco: boolean;
    provider: boolean;
    providerCode: boolean;
    jobId: boolean;
    seoJobId: boolean;
    nowId: boolean;
    template: boolean;
}

export const SettingsSchema: Record<SettingsKey, string> = {
    adProvider: 'boolean',
    ingestionMethod: 'boolean',
    pricingType: 'boolean',
    applyType: 'boolean',
    location: 'boolean',
    dateRecency: 'boolean',
    formattedDate: 'boolean',
    xCode: 'boolean',
    company: 'boolean',
    title: 'boolean',
    mesco: 'boolean',
    provider: 'boolean',
    providerCode: 'boolean',
    jobId: 'boolean',
    seoJobId: 'boolean',
    nowId: 'boolean',
    template: 'boolean'
};

export const defaultSettings = {
    adProvider: true,
    ingestionMethod: true,
    pricingType: true,
    applyType: true,
    location: true,
    dateRecency: true,
    formattedDate: true,
    xCode: true,
    company: true,
    title: true,
    mesco: true,
    provider: true,
    providerCode: false,
    jobId: false,
    seoJobId: false,
    nowId: true,
    template: true
};

export type SettingsKey = keyof Settings;


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

    let errors = false;
    Object.values(input).forEach((value) => {
        if (typeof value !== 'boolean') {
            errors = true;
        }
    })
    if (errors) return false;

    const missingProperties = Object.keys(SettingsSchema)
        .filter(key => input[key] === undefined)
        .map(key => key as keyof Settings)
        .map(key => new Error(`Document is missing ${key} ${SettingsSchema[key]}`));

    // throw error?

    return missingProperties.length === 0;
}

