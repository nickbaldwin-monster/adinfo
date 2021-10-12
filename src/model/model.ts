import { log } from "../helpers/logger";
import { Job } from "../types/Job";
import dayjs from "dayjs";
import { DisplayJob } from "../types/DisplayJob";

import { getDataFromUrl } from "../helpers/decodeImpUrl";

export const currentVersion = {
    version: '2.0.5'
};


// todo - this will provide augmented values
export const getImpressionData = (impressionUrl: string) => {

};



const normalizePostLocation = (locations: object[]): string => {
    // @ts-ignore
    if (!locations || locations.length === 0 ) {
        return '';
    }

    let loc = '';
    // @ts-ignore
    locations.forEach((a: object) => {
        // @ts-ignore
        let add = a?.address;
        if (add) {
            // @ts-ignore
            // loc += add.addressLocality + ", " + add.addressRegion + ", " + add.postalCode + ", " + add.addressCountry + ". ";

            let thisLoc = [add.addressLocality, add.addressRegion, add.postalCode,add.addressCountry].filter(Boolean).join(", ");
            if (thisLoc) {
                thisLoc.concat('.');
                loc += thisLoc + '. ';
            }
        }

    });

    return loc;
}


const formatDate = (date: string): string => {
    if (!date || date === '') {
        return '';
    }
    let d = dayjs(date).format('D MMM YY');
    return d || date;
};



const nowAdIds = (object: object[]): string => {

    if (!object || object.length === 0) {
        return "";
    }
    return object
        // @ts-ignore
        .filter( (identity: object) => identity?.identifierName === 'POSITION_AD_ID')
        // @ts-ignore
        .map((identity: object) =>  identity.identifierValue)
            // @ts-ignore
        .join(", ") || "";
}




export interface Property {
    field: string
    title: string,
    width: string,
    sensitive: boolean,
    locked: boolean,
    reorderable: boolean,
    orderIndex?: number,
    visible: boolean,
    jobProperty: boolean,
    additionalProperty: boolean,
    tableField: boolean,
    setting: boolean,
    disabled: boolean,
    sourceProperty: string | null
    transformProperty: { (object: object | any): string } | null;
    augmentedProperty: string | null
    className?: string,
    headerClassName?: string
}



// todo - object and extract values? object with array for job and array for settings?





export const model: Record<string, Property> = {
    position: {
        field: "position",
        title: "Position",
        width: "50px",
        sensitive: false,
        locked: true,
        reorderable: false,
        orderIndex: 0,
        visible: true,
        jobProperty: false,
        additionalProperty: true,
        tableField: true,
        setting: true,
        disabled: true,
        sourceProperty: null,
        transformProperty: null,
        augmentedProperty: null
    },
    decisionIndex: {
        field: "decisionIndex",
        title: "Decision index",
        width: "50px",
        sensitive: false,
        locked: true,
        reorderable: false,
        orderIndex: 0,
        visible: false,
        jobProperty: true,
        additionalProperty: false,
        tableField: true,
        setting: true,
        disabled: false,
        sourceProperty: null,
        transformProperty:  null,
        augmentedProperty: 'decisionIndex'
    },
    remainder: {
        field: "remainder",
        title: "Remainder?",
        width: "40px",
        sensitive: false,
        locked: true,
        reorderable: false,
        orderIndex: 0,
        visible: false,
        jobProperty: true,
        additionalProperty: false,
        tableField: true,
        setting: true,
        disabled: false,
        sourceProperty:  null,
        transformProperty: null,
        augmentedProperty: 'remainder'
    },
    ecpm: {
        field: "ecpm",
        title: "eCPM",
        width: "80px",
        sensitive: true,
        locked: true,
        reorderable: true,
        orderIndex: 0,
        visible: false,
        jobProperty: true,
        additionalProperty: false,
        tableField: true,
        setting: true,
        disabled: false,
        sourceProperty: null,
        transformProperty: null,
        augmentedProperty: 'ecpm'
    },
    price: {
        field: "price",
        title: "Bid",
        width: "80px",
        sensitive: true,
        locked: true,
        reorderable: true,
        orderIndex: 0,
        visible: false,
        jobProperty: true,
        additionalProperty: false,
        tableField: true,
        setting: true,
        disabled: false,
        sourceProperty: null,
        transformProperty:  null,
        augmentedProperty: 'price'
    },
    adProvider: {
        field: "adProvider",
        title: "Ad Provider",
        width: "120px",
        sensitive: false,
        locked: true,
        reorderable: false,
        orderIndex: 0,
        visible: true,
        jobProperty: true,
        additionalProperty: false,
        tableField: true,
        setting: true,
        disabled: true,
        sourceProperty: 'jobAd',
        transformProperty:  (object: object)  =>  {
            // @ts-ignore
            return object?.provider || "";
        },
        augmentedProperty: null
    },
    company: {
        field: "company",
        title: "Company",
        width: "100px",
        sensitive: false,
        locked: true,
        reorderable: false,
        orderIndex: 0,
        visible: true,
        jobProperty: true,
        additionalProperty: false,
        tableField: true,
        setting: true,
        disabled: true,
        sourceProperty: 'jobPosting',
        transformProperty:  (object: object)  =>  {
            // @ts-ignore
            return object?.hiringOrganization?.name || "";
        },
        className:'gridBorder',
        headerClassName: 'gridBorder',
        augmentedProperty: null
    },
    title: {
        field: "title",
        title: "Title",
        width: "150px",
        sensitive: false,
        locked: false,
        reorderable: true,
        //orderIndex: 1,
        visible: true,
        jobProperty: true,
        additionalProperty: false,
        tableField: true,
        setting: true,
        disabled: false,
        sourceProperty: 'jobPosting',
        transformProperty:  (object: object)  =>  {
            // @ts-ignore
            return object?.title || "";
        },
        augmentedProperty: null
    },
    location: {
        field: "location",
        title: "Location",
        width: "120px",
        sensitive: false,
        locked: false,
        reorderable: false,
        //orderIndex: 1,
        visible: true,
        jobProperty: true,
        additionalProperty: false,
        tableField: true,
        setting: true,
        disabled: false,
        sourceProperty: 'jobPosting',
        transformProperty:  (object: object)  =>  {
            // @ts-ignore
            return normalizePostLocation(object?.jobLocation);
        },
        augmentedProperty: 'location'
    },
    nowId: {
        field: "nowId",
        title: "nowId",
        width: "80px",
        sensitive: false,
        locked: false,
        reorderable: true,
        // orderIndex: 1,
        visible: true,
        jobProperty: true,
        additionalProperty: false,
        tableField: true,
        setting: true,
        disabled: false,
        sourceProperty: 'externalIdentifiers',
        transformProperty:  (object: object)  =>  {
            // @ts-ignore
            return nowAdIds(object);
        },
        augmentedProperty: null
    },
    jobId: {
        field: "jobId",
        title: "jobId",
        width: "80px",
        sensitive: false,
        locked: false,
        reorderable: true,
        //orderIndex: 1,
        visible: true,
        jobProperty: true,
        additionalProperty: false,
        tableField: true,
        setting: true,
        disabled: false,
        sourceProperty: 'jobId',
        transformProperty: null,
        augmentedProperty: null
    },
    template: {
        field: "template",
        title: "templateId",
        width: "80px",
        sensitive: false,
        locked: false,
        reorderable: true,
        // orderIndex: 1,
        visible: true,
        jobProperty: true,
        additionalProperty: false,
        tableField: true,
        setting: true,
        disabled: false,
        sourceProperty: 'now',
        transformProperty:  (object: object)  =>  {
            // @ts-ignore
            return "" + (object?.templateId || "");
        },
        augmentedProperty: null
    },
    xCode: {
        field: "xCode",
        title: "xCode",
        width: "80px",
        sensitive: false,
        locked: false,
        reorderable: true,
        //orderIndex: 1,
        visible: true,
        jobProperty: true,
        additionalProperty: false,
        tableField: true,
        setting: true,
        disabled: false,
        sourceProperty: 'enrichments',
        transformProperty:  (object: object)  =>  {
            // @ts-ignore
            return object?.companyKb?.code || "";
        },
        augmentedProperty: null
    },
    applyType: {
        field: "applyType",
        title: "Apply type",
        width: "70px",
        sensitive: false,
        locked: false,
        reorderable: true,
        // orderIndex: 1,
        visible: false,
        jobProperty: true,
        additionalProperty: false,
        tableField: true,
        setting: true,
        disabled: false,
        sourceProperty: 'apply',
        transformProperty:  (object: object)  =>  {
            // @ts-ignore
            return object?.applyType.toLowerCase() || "";
        },
        augmentedProperty: null
    },
    formattedDate: {
        field: "formattedDate",
        title: "Date",
        width: "70px",
        sensitive: false,
        locked: false,
        reorderable: true,
        //orderIndex: 1,
        visible: true,
        jobProperty: true,
        additionalProperty: false,
        tableField: true,
        setting: true,
        disabled: false,
        sourceProperty: 'formattedDate',
        transformProperty:  (object: string)  =>  {
            // @ts-ignore
            return formatDate(object);
        },
        augmentedProperty: null
    },
    mesco: {
        field: "mesco",
        title: "MescoId",
        width: "100px",
        sensitive: false,
        locked: false,
        reorderable: true,
        //orderIndex: 1,
        visible: false,
        jobProperty: true,
        additionalProperty: false,
        tableField: true,
        setting: true,
        disabled: false,
        sourceProperty: 'enrichments',
        transformProperty:  (object: object)  =>  {
            // @ts-ignore
            return object?.mescos.map((mesco) => mesco.name || mesco.id).join(', ');
        },
        augmentedProperty: null
    },
    provider: {
        field: "provider",
        title: "Provider",
        width: "70px",
        sensitive: false,
        locked: false,
        reorderable: true,
        //orderIndex: 1,
        visible: false,
        jobProperty: true,
        additionalProperty: false,
        tableField: true,
        setting: true,
        disabled: false,
        sourceProperty: 'provider',
        transformProperty:  (object: object)  =>  {
            // @ts-ignore
            return object?.name || "";
        },
        augmentedProperty: null
    },
    providerCode: {
        field: "providerCode",
        title: "Provider Code",
        width: "80px",
        sensitive: false,
        locked: false,
        reorderable: true,
        //orderIndex: 1,
        visible: false,
        jobProperty: true,
        additionalProperty: false,
        tableField: true,
        setting: true,
        disabled: false,
        sourceProperty: 'provider',
        transformProperty:  (object: object)  =>  {
            // @ts-ignore
            return object?.code || "";
        },
        augmentedProperty: null
    },
    dateRecency: {
        field: "dateRecency",
        title: "Recency",
        width: "80px",
        sensitive: false,
        locked: false,
        reorderable: false,
        //orderIndex: 1,
        visible: true,
        jobProperty: true,
        additionalProperty: false,
        tableField: true,
        setting: true,
        disabled: false,
        sourceProperty: 'dateRecency',
        transformProperty: null,
        augmentedProperty: null
    },
    ingestionMethod: {
        field: "ingestionMethod",
        title: "Ingestion",
        width: "70px",
        sensitive: false,
        locked: false,
        reorderable: true,
        //orderIndex: 1,
        visible: false,
        jobProperty: true,
        additionalProperty: false,
        tableField: true,
        setting: true,
        disabled: false,
        sourceProperty: 'ingestionMethod',
        transformProperty: null,
        augmentedProperty: null
    },
    pricingType: {
        field: "pricingType",
        title: "Pricing type",
        width: "50px",
        sensitive: false,
        locked: false,
        reorderable: true,
        //orderIndex: 1,
        visible: true,
        jobProperty: true,
        additionalProperty: false,
        tableField: true,
        setting: true,
        disabled: false,
        sourceProperty: 'now',
        transformProperty:  (object: object)  =>  {
            // @ts-ignore
            return "" + (object?.jobAdPricingTypeId || "");
        },
        augmentedProperty: null
    },
    // todo
    seoJobId: {
        field: "seoJobId",
        title: "seoJobId",
        width: "60px",
        sensitive: false,
        locked: false,
        reorderable: true,
        //orderIndex: 1,
        visible: false,
        jobProperty: true,
        additionalProperty: false,
        tableField: true,
        setting: true,
        disabled: false,
        sourceProperty: 'seoJobId',
        transformProperty: null,
        augmentedProperty: null
    },
    refCode: {
        field: "refCode",
        title: "refCode",
        width: "60px",
        sensitive: false,
        locked: false,
        reorderable: true,
        //orderIndex: 1,
        visible: false,
        jobProperty: true,
        additionalProperty: false,
        tableField: true,
        setting: true,
        disabled: false,
        sourceProperty: 'jobPosting',
        transformProperty:  (object: object)  =>  {
            // @ts-ignore
            return object?.identifier?.value || "";
        },
        augmentedProperty: null
    },
    validThrough: {
        field: "validThrough",
        title: "validThrough",
        width: "80px",
        sensitive: false,
        locked: false,
        reorderable: true,
        //orderIndex: 1,
        visible: false,
        jobProperty: true,
        additionalProperty: false,
        tableField: true,
        setting: true,
        disabled: false,
        sourceProperty: 'jobPosting',
        transformProperty:  (object: object)  =>  {
            // @ts-ignore
            return formatDate(object?.validThrough);
        },
        augmentedProperty: null
    },
    validThroughGoogle: {
        field: "validThroughGoogle",
        title: "validThroughGoogle",
        width: "80px",
        sensitive: false,
        locked: false,
        reorderable: true,
        //orderIndex: 1,
        visible: false,
        jobProperty: true,
        additionalProperty: false,
        tableField: true,
        setting: true,
        disabled: false,
        sourceProperty: 'enrichments',
        transformProperty:  (object: object)  =>  {
            // @ts-ignore
            return formatDate(object?.googleSyntheticValidThrough);
        },
        augmentedProperty: null
    },
    // todo
    remote: {
        field: "remote",
        title: "Remote?",
        width: "50px",
        sensitive: false,
        locked: false,
        reorderable: true,
        //orderIndex: 1,
        visible: false,
        jobProperty: true,
        additionalProperty: false,
        tableField: true,
        setting: true,
        disabled: false,
        sourceProperty: null,
        transformProperty:  (object: object)  =>  {
            // @ts-ignore
            return "";
        },
        augmentedProperty: null
    },
    decisionId: {
        field: "decisionId",
        title: "Decision ID",
        width: "140px",
        sensitive: false,
        locked: false,
        reorderable: true,
        //orderIndex: 1,
        visible: false,
        jobProperty: true,
        additionalProperty: false,
        tableField: true,
        setting: true,
        disabled: false,
        sourceProperty: null,
        transformProperty: null,
        augmentedProperty: 'decisionId'
    },
    url: {
        field: "url",
        title: "url",
        width: "100px",
        sensitive: false,
        locked: false,
        reorderable: true,
        //orderIndex: 1,
        visible: false,
        jobProperty: true,
        additionalProperty: false,
        tableField: false,
        setting: false,
        disabled: false,
        sourceProperty: 'jobPosting',
        transformProperty:  (object: object)  =>  {
            // @ts-ignore
            return object?.url || "";
        },
        augmentedProperty: null
    },
    selected: {
        field: "selected",
        title: "",
        width: "",
        sensitive: false,
        locked: true,
        reorderable: false,
        //orderIndex: 0,
        visible: true,
        jobProperty: false,
        additionalProperty: true,
        tableField: false,
        setting: false,
        disabled: true,
        sourceProperty: null,
        transformProperty: null,
        augmentedProperty: null
    },
    data: {
        field: "data",
        title: "",
        width: "",
        sensitive: false,
        locked: true,
        reorderable: false,
        //orderIndex: 0,
        visible: false,
        jobProperty: false,
        additionalProperty: true,
        tableField: false,
        setting: false,
        disabled: true,
        sourceProperty: null,
        transformProperty: null,
        augmentedProperty: null
    },
    kevelData: {
        field: "kevelData",
        title: "",
        width: "",
        sensitive: false,
        locked: true,
        reorderable: false,
        //orderIndex: 0,
        visible: false,
        jobProperty: false,
        additionalProperty: true,
        tableField: false,
        setting: false,
        disabled: true,
        sourceProperty: null,
        transformProperty: null,
        augmentedProperty: null
    },
};


export const trJob = (job: Job, position?: number) => {
    let message = '';
    let kevelData = {};
    let impressionUrl = job?.jobAd?.tracking?.impressionUrl;
    if (job.jobAd && !impressionUrl) {
        message = 'error - no impression url for job ' + job.jobId;
    }
    else {
        kevelData = getDataFromUrl(impressionUrl || 'noUrl', job?.jobId);
    }

    // @ts-ignore
    if (kevelData.error) {
        message += "cannot decode impression url for job " + job.jobId;
    }
    if (message) {
        console.log(message);
    }


    // todo - keep list so do not do it every transform
    let obj: object = {};
    if (!job) {
        console.log('error - no job!')
        return obj;
    }

    let list = getJobProperties();

    list.forEach((propertyName: string) => {

        let srcProp = model[propertyName]?.sourceProperty;
        let augProp = model[propertyName]?.augmentedProperty;
        let func = model[propertyName]?.transformProperty;
        if (srcProp) {
            if (func) {
                // @ts-ignore
                obj[propertyName] = func(job[srcProp]);
            }
            else {
                // @ts-ignore
                obj[propertyName] = job[srcProp];
            }
        }
        else if (augProp) {

            // @ts-ignore
            if (!kevelData) {
                // @ts-ignore
                obj[propertyName] = '';
            }
            /*
            else if (func) {
                // @ts-ignore
                obj[propertyName] = func(aug[augProp]);
            }

             */
            else {
                // @ts-ignore
                obj[propertyName] = kevelData[augProp];
            }
        }
        else if (propertyName === 'position') {
            // @ts-ignore
            obj[propertyName] = _i;
        }
        else {
            // @ts-ignore
            obj[propertyName] = "";
        }


    });
    // @ts-ignore
    obj.position = position + 1;
    // @ts-ignore
    obj.selected = false;
    // @ts-ignore
    obj.data = job;
    // @ts-ignore
    obj.kevelData = kevelData;

    return obj;
}


export const transformJobsNew = (jobsList: object) => {

    // @ts-ignore
    if (!jobsList || !jobsList.jobResults) {
        return [];
    }

    let list = <DisplayJob[]> [];
    // @ts-ignore
    jobsList.jobResults.forEach( (job: object, i: number) => {
        // @ts-ignore
        list.push(trJob(job, i, job.jobAd?.tracking?.impressionUrl));
    });

    return list;
};





// return all properties that are derived from job item
export const getJobProperties = () => {
    return Object.values(model)
        .filter((field: Property) => field.jobProperty)
        .map((field: Property) => field.field);
};

// return all fields that need to be passed to the table
export const getNamesOfJobFields = () => {
    return Object.values(model)
        .filter((field: Property) => field.tableField)
        .map((field: Property) => field.field);
};

export const getNamesOfAllProperties = () => {
    return Object.keys(model);
};

// should be same now as getAllProperties, but could change in future?
export const getNamesOfSettings = () => {
    return Object.values(model)
        .filter((field: Property) => field.setting)
        .map((field: Property) => field.field);
};

export const getAllProperties = () => {
    let o = {};
    for (let key in model) {
        // @ts-ignore
        o[key] = true
    }
    return o;
};

const settingNamesMap = getAllProperties();
const settingNamesList = getNamesOfSettings();

interface UserSetting {
    [key: string]: { visible: boolean, width: string };
}
export interface UserSettings {
    version?: string;
    settings: UserSetting | {};
    order: string[] | [];
}

export const getDefaultUserSettings = () => {
    let newSettings: UserSettings = {
        version: currentVersion.version,
        settings: {},
        order: []
    }
    getNamesOfSettings().forEach((jobName: string) => {
         let setting = model[jobName]
        // @ts-ignore
        newSettings.settings[jobName] = { visible: setting.visible, width: setting.width };
        // @ts-ignore
        newSettings.order.push(jobName);
     });
    return newSettings;
};

export const JobProperties = {
    '2.0.4': [
        "company",
        "adProvider",
        "title",
        "location",
        "nowId",
        "jobId",
        "template",
        "xCode",
        "applyType",
        "formattedDate",
        "mesco",
        "provider",
        "providerCode",
        "dateRecency",
        "ingestionMethod",
        "pricingType",
        "seoJobId",
        "refCode",
        "validThrough",
        "validThroughGoogle",
        "remote",
        "di",
        "ec",
        "pc",
        "dj",
    ],
    '2.0.5': [
        "position",
        "decisionIndex",
        "remainder",
        "ecpm",
        "price",
        "adProvider",
        "company",
        "title",
        "location",
        "nowId",
        "jobId",
        "template",
        "xCode",
        "applyType",
        "formattedDate",
        "mesco",
        "provider",
        "providerCode",
        "dateRecency",
        "ingestionMethod",
        "pricingType",
        "seoJobId",
        "refCode",
        "validThrough",
        "validThroughGoogle",
        "remote",
        "decisionId",
    ]
}



const migrationNeeded: Record<string, boolean> = {
    '': true,
    '2.0.3': true,
    '2.0.4': true,
    '2.0.5': false
}

export const needToMigrate = (version: string | null | undefined) => {
    if (!version || version === 'null' || version === 'undefined') {
        return true;
    }
    return migrationNeeded[version] || false;
}


export const migrateFlatObject = (store: object | null | undefined) => {
    let newStore = { ...getDefaultUserSettings() };
    if (!store) {
        return newStore;
    }

    Object.keys(store).forEach((key) => {
        // @ts-ignore
        if (newStore.settings[key]) {
            // @ts-ignore
            newStore.settings[key].visible = store[key];
        }
    });

    return newStore;
}

export const isValidUserSetting = (userSetting: UserSetting | any) : boolean => {
    if (!userSetting || typeof userSetting !== 'object' || userSetting === {}) {
        return false
    }
    let key = Object.keys(userSetting)[0];
    return !(!userSetting[key] || typeof userSetting[key] !== 'object' ||
        !(key in settingNamesMap) ||
        userSetting[key].visible === undefined || typeof userSetting[key].visible !== 'boolean' ||
        !userSetting[key].width || typeof userSetting[key].width !== 'string');
}

export const isValidUserSettings = (store: UserSettings | any | null | undefined) : boolean => {

    if (!store || !store.settings || typeof store.settings !== 'object' ||
        !store.order || typeof store.order !== 'object' ||
        !store.version || typeof store.version !== 'string') {
        return false;
    }
    let storeSettingNames = (Object.keys(store.settings));
    if (storeSettingNames.length !== settingNamesList.length ||
        store.order.length !== settingNamesList.length) {
        return false;
    }
    for (let i = 0; i < storeSettingNames.length; i++) {
        if (!isValidUserSetting({
            [storeSettingNames[i]]: store.settings[storeSettingNames[i]]
        })) {
            return false;
        }
    }
    return true;
}


export const userSettingsReducer = (settings: UserSettings, settingName: string) => {

    if (settings && settingName) {
        // @ts-ignore
        let prevSettingValue = settings.settings[settingName].visible;
        let nextSetting = {
            [settingName]: {
                // @ts-ignore
                ...settings.settings[settingName],
                visible: !prevSettingValue
            }
        };
        if (!isValidUserSetting(nextSetting)) {
            log({
                logType: 'ERROR',
                error: 'unable to update Settings',
                payload: { nextSetting }
            });
            console.log('invalid setting');
            return settings;
        }
        else {
            let nextSettings = {
                ...settings,
                settings: {
                    ...settings.settings,
                    ...nextSetting
                }
            }
            log({
                logType: 'INFO',
                message: 'new state in reducer',
                payload: { nextSettings }
            });
            console.log('new settings: ', nextSettings);
            return nextSettings;
        }
    }
    else {
        log({
            logType: 'ERROR',
            error: 'unable to update Settings',
            payload: { settingName }
        });
        console.log('problem - old settings -: ', settings);
        return settings;
    }
}