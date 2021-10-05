
export interface Settings {
    company: boolean;
    adProvider: boolean;
    title: boolean;
    location: boolean;
    nowId: boolean;
    jobId: boolean;
    template: boolean;
    xCode: boolean;
    applyType: boolean; // false
    formattedDate: boolean;
    mesco: boolean;  // false
    provider: boolean;  // false
    providerCode: boolean;  // false
    dateRecency: boolean;
    ingestionMethod: boolean;
    pricingType: boolean;
    seoJobId: boolean;
    refCode: boolean;
    validThrough: boolean;
    validThroughGoogle: boolean;
    remote: boolean;
    di: boolean;
    dj: boolean;
    ec: boolean;
    pc: boolean;
}

export type SettingsKey = keyof Settings;
export const SettingsSchema: Record<SettingsKey, string> = {
    company: 'boolean',
    adProvider: 'boolean',
    title: 'boolean',
    location: 'boolean',
    nowId: 'boolean',
    jobId: 'boolean',
    template: 'boolean',
    xCode: 'boolean',
    applyType: 'boolean',  // false
    formattedDate: 'boolean',
    mesco: 'boolean', // false
    provider: 'boolean', // false
    providerCode: 'boolean', // false
    dateRecency: 'boolean',
    ingestionMethod: 'boolean',
    pricingType: 'boolean',
    seoJobId: 'boolean',
    refCode: 'boolean',
    validThrough: 'boolean',
    validThroughGoogle: 'boolean',
    remote: 'boolean',
    di: 'boolean',
    dj: 'boolean',
    ec: 'boolean',
    pc: 'boolean'
};

export const defaultSettings: Settings = {
    company: true,
    adProvider: true,
    title: true,
    location: true,
    nowId: true,
    jobId: true,
    template: true,
    xCode: true,
    applyType: false,
    formattedDate: true,
    mesco: false,
    provider: false,
    providerCode: false,
    dateRecency: true,
    ingestionMethod: false,
    pricingType: true,
    seoJobId: false,
    refCode: false,
    validThrough: false, // ?
    validThroughGoogle: false, // ?
    remote: false, // ?,
    di: false,
    dj: false,
    ec: false,
    pc: false
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

