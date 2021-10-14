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




export interface DataProperty {
    field: string // identifier used in code
    title: string, // name displayed in UI
    width: string, // default width of field if shown in table
    sensitive: boolean,
    locked: boolean, // locks field in table
                     // if locked, reorderable should be false
    reorderable: boolean, // stops field from being moved, if shown in table
    orderIndex?: number, // 0 indicates it should always be displayed before reorderable fields
    visible: boolean, // default visibility of field in table
    jobProperty: boolean, // is it derived from job info
    additionalProperty: boolean, // is it derived outside of job info
    tableField: boolean, // shown in table ui
    setting: boolean, // should appear as a setting
    disabled: boolean, // should setting be able to be changed
    sourceProperty: string | null // if jobProperty, which base field does the value get derived from
    transformProperty: { (object: object | any): string } | null; // if the base field need to be computed, use this fn
    augmentedProperty: string | null // if derived from aug info, which base field does the value get derived from
    className?: string, // pass in a classname to the field in the table view
    headerClassName?: string // pass in a classname to the field header in the table view
}



// todo - object and extract values? object with array for job and array for settings?





export const DataModel: Record<string, DataProperty> = {
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
        title: "Ad rank",
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
        tableField: false, // temp
        setting: false, // temp
        disabled: false,
        sourceProperty: null,
        transformProperty: null,
        augmentedProperty: 'ecpm'
    },
    price: {
        field: "price",
        title: "Clearing price",
        width: "80px",
        sensitive: true,
        locked: true,
        reorderable: true,
        orderIndex: 0,
        visible: false,
        jobProperty: true,
        additionalProperty: false,
        tableField: false, // temp
        setting: false, // temp
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
        title: "Remote? ",
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
        disabled: true,
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
        tableField: false,
        setting: false,
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


export interface FeatureProperty {
    field: string // identifier used in code
    title: string // label used in UI
    sensitive: boolean,
    setting: boolean, // should appear as a setting
    enabled: boolean, // default on or off
    disabled: boolean, // should setting be able to be changed
}

export const FeatureModel: Record<string, FeatureProperty> = {
    decorateResults: {
        field: 'decorateResults',
        title: 'Decorate results',
        sensitive: false,
        setting: true,
        enabled: true,
        disabled: false,
    },
    displayDevInfo: {
        field: 'displayDevInfo' ,
        title: 'Display Dev Info' ,
        sensitive: false,
        setting: true,
        enabled: true,
        disabled: false,
    },
}


export const trJob = (job: Job, position: string) => {

    let obj: object = {};
    if (!job) {
        console.log('error - no job!')
        return obj;
    }
    if (!position) {
        position = "";
    }

    let message = '';
    let kevelData = {};
    let impressionUrl = job?.jobAd?.tracking?.impressionUrl;
    if (job.jobAd && !impressionUrl) {
        message = 'error - no impression url for job ' + job.jobId;
    }
    else if (job.jobAd && impressionUrl) {
        kevelData = getDataFromUrl(impressionUrl || 'noUrl', job?.jobId);
    }

    // @ts-ignore
    if (job.jobAd && kevelData?.error) {
        message += "cannot decode impression url for job " + job.jobId;
    }
    if (message) {
        console.log(message);
    }


    // todo - keep list so do not do it every transform


    let list = getNamesOfJobProperties();

    list.forEach((propertyName: string) => {

        let srcProp = DataModel[propertyName]?.sourceProperty;
        let augProp = DataModel[propertyName]?.augmentedProperty;
        let func = DataModel[propertyName]?.transformProperty;
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
        else {
            // @ts-ignore
            obj[propertyName] = "";
        }


    });

    // @ts-ignore
    obj.position = position;
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
    jobsList.jobResults.forEach( (job: object, _i: number) => {
        // @ts-ignore
        list.push(trJob(job, "" + _i, job.jobAd?.tracking?.impressionUrl));
    });

    return list;
};





// return all properties that are derived from job item (incl from impression url)
export const getNamesOfJobProperties = () => {
    return Object.values(DataModel)
        .filter((field: DataProperty) => field.jobProperty)
        .map((field: DataProperty) => field.field);
};

// return all fields that can be displayed in the table
export const getNamesOfJobFields = () => {
    return Object.values(DataModel)
        .filter((field: DataProperty) => field.tableField)
        .map((field: DataProperty) => field.field);
};

export const getNamesOfAllProperties = () => {
    return Object.keys(DataModel);
};

// should be same now as getNamesOfJobFields, but could change in future?
export const getNamesOfDataSettings = () => {
    return Object.values(DataModel)
        .filter((field: DataProperty) => field.setting)
        .map((field: DataProperty) => field.field);
};

export const getNamesOfFeatureSettings = () => {
    return Object.values(FeatureModel)
        .filter((field: FeatureProperty) => field.setting)
        .map((field: FeatureProperty) => field.field);
};

export const getAllProperties = () => {
    let o = {};
    for (let key in DataModel) {
        // @ts-ignore
        o[key] = true
    }
    return o;
};

export const getAllFeatureSettings = () => {
    let o = {};
    for (let key in FeatureModel) {
        // @ts-ignore
        o[key] = true
    }
    return o;
};

const featureSettingNamesMap = getAllFeatureSettings();
const settingNamesMap = getAllProperties();
const dataSettingNamesList = getNamesOfDataSettings();
const featureSettingNamesList = getNamesOfFeatureSettings();

interface DataSetting {
    [key: string]: { visible: boolean, width: string };
}
interface FeatureSetting {
    [key: string]: { enabled: boolean };
}
export interface UserSettings {
    version?: string;
    dataSettings: DataSetting | {};
    dataOrder: string[] | [];
    featureSettings: FeatureSetting | {};
    featureOrder: string[];
}

export const getDefaultUserSettings = () => {
    let newSettings: UserSettings = {
        version: currentVersion.version,
        dataSettings: {},
        dataOrder: [],
        featureSettings: {},
        featureOrder: []
    }
    getNamesOfDataSettings().forEach((name: string) => {
         let setting = DataModel[name];
        // @ts-ignore
        newSettings.dataSettings[name] = { visible: setting.visible, width: setting.width };
        // @ts-ignore
        newSettings.dataOrder.push(name);
     });
    getNamesOfFeatureSettings().forEach((name: string) => {
        let setting = FeatureModel[name];
        // @ts-ignore
        newSettings.featureSettings[name] = { enabled: setting.enabled, disabled: setting.disabled };
        // @ts-ignore
        newSettings.featureOrder.push(name);
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
        if (newStore.dataSettings[key]) {
            // @ts-ignore
            newStore.dataSettings[key].visible = store[key];
        }
    });

    return newStore;
}



export const isValidDataSetting = (dataSetting: DataSetting | any) : boolean => {
    if (!dataSetting || typeof dataSetting !== 'object' || dataSetting === {}) {
        return false
    }
    let key = Object.keys(dataSetting)[0];
    return !(!dataSetting[key] || typeof dataSetting[key] !== 'object' ||
        !(key in settingNamesMap) ||
        dataSetting[key].visible === undefined || typeof dataSetting[key].visible !== 'boolean' ||
        !dataSetting[key].width || typeof dataSetting[key].width !== 'string');
}

export const isValidFeatureSetting = (featureSetting: FeatureSetting | any ) : boolean => {
    if (!featureSetting || typeof featureSetting !== 'object' || featureSetting === {}) {
        return false
    }
    let key = Object.keys(featureSetting)[0];
    return !(!featureSetting[key] || typeof featureSetting[key] !== 'object' ||
        !(key in featureSettingNamesMap) ||
        featureSetting[key].enabled === undefined || typeof featureSetting[key].enabled !== 'boolean' ||
        featureSetting[key].disabled === undefined || typeof featureSetting[key].disabled !== 'boolean');
}

export const isValidUserSettings = (store: UserSettings | any | null | undefined) : any => {

    if (!store || !store.version || typeof store.version !== 'string' ||
        !store.dataSettings || typeof store.dataSettings !== 'object' ||
        !store.dataOrder || typeof store.dataOrder !== 'object' ||
        !store.featureSettings || typeof store.featureSettings !== 'object' ||
        !store.featureOrder || typeof store.featureOrder !== 'object') {
        return false;
    }
    let dataSettingNames = (Object.keys(store.dataSettings));
    if (dataSettingNames.length !== dataSettingNamesList.length ||
        store.dataOrder.length !== dataSettingNamesList.length) {
        return 2;
    }
    for (let i = 0; i < dataSettingNames.length; i++) {
        if (!isValidDataSetting({
            [dataSettingNames[i]]: store.dataSettings[dataSettingNames[i]]
        })) {
            return 3;
        }
    }
    let featureSettingNames = (Object.keys(store.featureSettings));
    if (featureSettingNames.length !== featureSettingNamesList.length ) {
        return 4;
    }
    for (let i = 0; i < featureSettingNames.length; i++) {
        if (!isValidFeatureSetting({
            [featureSettingNames[i]]: store.featureSettings[featureSettingNames[i]]
        })) {
            return 5;
        }
    }
    return true;
}


export const userSettingsReducer = (settings: UserSettings, settingName: string) => {

    if (!settings || !settingName || !DataModel[settingName] || DataModel[settingName]?.setting === false) {
        log({
            logType: 'ERROR',
            error: 'unable to update Settings',
            payload: { settingName }
        });
        console.log('problem - old settings -: ', settings);
        return settings;
    }

    // @ts-ignore
    let prevSettingValue = settings.dataSettings[settingName].visible;
    let nextSetting = {
        [settingName]: {
            // @ts-ignore
            ...settings.dataSettings[settingName],
            visible: !prevSettingValue
        }
    };
    if (!isValidDataSetting(nextSetting)) {
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
            dataSettings: {
                ...settings.dataSettings,
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