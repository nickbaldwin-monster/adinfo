import { normalizePostLocation, nowAdIds, formatDate, getImpressionData, formatLocationType } from "./transformJob";



export const currentVersion = {
    version: '2.5.0'
};


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
    adRank: {
        field: "adRank",
        title: "AdRank",
        width: "70px",
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
    ecpm: {
        field: "ecpm",
        title: "eCPM",
        width: "80px",
        sensitive: false,
        locked: true,
        reorderable: true,
        orderIndex: 0,
        visible: false,
        jobProperty: true,
        additionalProperty: false,
        tableField: true, // temp
        setting: true, // temp
        disabled: false,
        sourceProperty: null,
        transformProperty: null,
        augmentedProperty: 'ecpm'
    },
    price: {
        field: "price",
        title: "Clearing price",
        width: "80px",
        sensitive: false,
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
    description: {
        field: "description",
        title: "Description",
        width: "200px",
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
            return object?.description || "";
        },
        augmentedProperty: null
    },
    location: {
        field: "location",
        title: "Location",
        width: "120px",
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
        reorderable: true,
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

    remote: {
        field: "remote",
        title: "Remote?",
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
                return formatLocationType(object?.jobLocationType);
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
        disabled: true,
    },
    displayDevInfo: {
        field: 'displayDevInfo' ,
        title: 'Display Dev Info' ,
        sensitive: false,
        setting: true,
        enabled: false,
        disabled: false,
    },
}


export interface DisplayProperty {
    field: string // identifier used in code
    title: string // label used in UI
    setting: boolean, // should appear as a setting?
    value: string;
}

export const DisplayModel: Record<string, DisplayProperty> = {
    tableWidth: {
        field: 'tableWidth',
        title: 'Table width',
        setting: false,
        value: "800px"
    }
}












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

export const getNamesOfDisplaySettings = () => {
    return Object.values(DisplayModel)
        // .filter((field: FeatureProperty) => field.setting)
        .map((field: DisplayProperty) => field.field);
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

export const getAllDisplaySettings = () => {
    let o = {};
    for (let key in DisplayModel) {
        // @ts-ignore
        o[key] = true
    }
    return o;
};
