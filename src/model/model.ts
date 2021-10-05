
export const currentVersion = {
    version: '2.0.5'
};


export interface Property {
    field: string
    title: string,
    width: string,
    locked: boolean,
    reorderable: boolean,
    orderIndex: number | null,
    visible: boolean,
    jobProperty: boolean,
    setting: boolean,
    disabled: boolean,
    className?: string,
    headerClassName?: string
}



// todo - object and extract values? object with array for job and array for settings?





export const model: Record<string, Property> = {
    position: {
        field: "position",
        title: "Pos",
        width: "50px",
        locked: true,
        reorderable: false,
        orderIndex: 0,
        visible: true,
        jobProperty: false,
        setting: true,
        disabled: true
    },
    decisionIndex: {
        field: "decisionIndex",
        title: "D index",
        width: "50px",
        locked: true,
        reorderable: false,
        orderIndex: 0,
        visible: false,
        jobProperty: true,
        setting: true,
        disabled: false
    },
    remainder: {
        field: "remainder",
        title: "Remainder?",
        width: "80px",
        locked: true,
        reorderable: false,
        orderIndex: 0,
        visible: false,
        jobProperty: true,
        setting: true,
        disabled: false
    },
    company: {
        field: "company",
        title: "Company",
        width: "100px",
        locked: true,
        reorderable: false,
        orderIndex: 0,
        visible: true,
        jobProperty: true,
        setting: true,
        disabled: false
    },
    adProvider: {
        field: "adProvider",
        title: "Ad Provider",
        width: "120px",
        locked: true,
        reorderable: false,
        orderIndex: 0,
        visible: true,
        jobProperty: true,
        setting: true,
        disabled: true,
        className:'gridBorder',
        headerClassName: 'gridBorder'
    },
    title: {
        field: "title",
        title: "Title",
        width: "150px",
        locked: false,
        reorderable: true,
        orderIndex: null,
        visible: true,
        jobProperty: true,
        setting: true,
        disabled: false,
    },
    location: {
        field: "location",
        title: "Location",
        width: "120px",
        locked: false,
        reorderable: false,
        orderIndex: null,
        visible: true,
        jobProperty: true,
        setting: true,
        disabled: false,
    },
    nowId: {
        field: "nowId",
        title: "nowId",
        width: "80px",
        locked: false,
        reorderable: true,
        orderIndex: null,
        visible: true,
        jobProperty: true,
        setting: true,
        disabled: false,
    },
    jobId: {
        field: "jobId",
        title: "jobId",
        width: "80px",
        locked: false,
        reorderable: true,
        orderIndex: null,
        visible: true,
        jobProperty: true,
        setting: true,
        disabled: false,
    },

    template: {
        field: "template",
        title: "templateId",
        width: "80px",
        locked: false,
        reorderable: true,
        orderIndex: null,
        visible: true,
        jobProperty: true,
        setting: true,
        disabled: false,
    },
    xCode: {
        field: "xCode",
        title: "xCode",
        width: "80px",
        locked: false,
        reorderable: true,
        orderIndex: null,
        visible: true,
        jobProperty: true,
        setting: true,
        disabled: false,
    },
    applyType: {
        field: "applyType",
        title: "Apply",
        width: "70px",
        locked: false,
        reorderable: true,
        orderIndex: null,
        visible: false,
        jobProperty: true,
        setting: true,
        disabled: false,
    },
    formattedDate: {
        field: "formattedDate",
        title: "Date",
        width: "70px",
        locked: false,
        reorderable: true,
        orderIndex: null,
        visible: true,
        jobProperty: true,
        setting: true,
        disabled: false,
    },
    mesco: {
        field: "mesco",
        title: "MescoId",
        width: "100px",
        locked: false,
        reorderable: true,
        orderIndex: null,
        visible: false,
        jobProperty: true,
        setting: true,
        disabled: false,
    },
    provider: {
        field: "provider",
        title: "Provider",
        width: "70px",
        locked: false,
        reorderable: true,
        orderIndex: null,
        visible: false,
        jobProperty: true,
        setting: true,
        disabled: false,
    },
    providerCode: {
        field: "providerCode",
        title: "Provider Code",
        width: "80px",
        locked: false,
        reorderable: true,
        orderIndex: null,
        visible: false,
        jobProperty: true,
        setting: true,
        disabled: false,
    },
    dateRecency: {
        field: "dateRecency",
        title: "Recency",
        width: "80px",
        locked: false,
        reorderable: false,
        orderIndex: null,
        visible: true,
        jobProperty: true,
        setting: true,
        disabled: false,
    },
    ingestionMethod: {
        field: "ingestionMethod",
        title: "Ingestion",
        width: "70px",
        locked: false,
        reorderable: true,
        orderIndex: null,
        visible: false,
        jobProperty: true,
        setting: true,
        disabled: false,
    },
    pricingType: {
        field: "pricingType",
        title: "$Type",
        width: "50px",
        locked: false,
        reorderable: true,
        orderIndex: null,
        visible: true,
        jobProperty: true,
        setting: true,
        disabled: false,
    },

    // todo
    seoJobId: {
        field: "seoJobId",
        title: "seoJobId",
        width: "60px",
        locked: false,
        reorderable: true,
        orderIndex: null,
        visible: false,
        jobProperty: true,
        setting: true,
        disabled: false,
    },
    refCode: {
        field: "refCode",
        title: "refCode",
        width: "60px",
        locked: false,
        reorderable: true,
        orderIndex: null,
        visible: false,
        jobProperty: true,
        setting: true,
        disabled: false,
    },
    validThrough: {
        field: "validThrough",
        title: "validThrough",
        width: "80px",
        locked: false,
        reorderable: true,
        orderIndex: null,
        visible: false,
        jobProperty: true,
        setting: true,
        disabled: false,
    },
    validThroughGoogle: {
        field: "validThroughGoogle",
        title: "validThroughGoogle",
        width: "80px",
        locked: false,
        reorderable: true,
        orderIndex: null,
        visible: false,
        jobProperty: true,
        setting: true,
        disabled: false,
    },
    remote: {
        field: "remote",
        title: "Remote?",
        width: "50px",
        locked: false,
        reorderable: true,
        orderIndex: null,
        visible: false,
        jobProperty: true,
        setting: true,
        disabled: false,
    },
    ecpm: {
        field: "ecpm",
        title: "ec",
        width: "80px",
        locked: false,
        reorderable: true,
        orderIndex: null,
        visible: false,
        jobProperty: true,
        setting: true,
        disabled: false,
    },
    price: {
        field: "price",
        title: "pc",
        width: "80px",
        locked: false,
        reorderable: true,
        orderIndex: null,
        visible: false,
        jobProperty: true,
        setting: true,
        disabled: false,
    },
    decisionId: {
        field: "decisionId",
        title: "Decision ID",
        width: "140px",
        locked: false,
        reorderable: true,
        orderIndex: null,
        visible: false,
        jobProperty: true,
        setting: true,
        disabled: false,
    }
};

export const getJobProperties = () => {
    return Object.values(model)
        .filter((field: Property) => field.jobProperty)
        .map((field: Property) => field.field);
};

export const getAllProperties = () => {
    return Object.keys(model); //.map((field: JobField) => field.field);
};

// should be same now as getAllProperties, but could change in future?
export const getAllSettingNames = () => {
    return Object.values(model)
        .filter((field: Property) => field.setting)
        .map((field: Property) => field.field);
};

export const getMapOfAllSettingNames = () => {
    let o = {};
    for (let key in model) {
        // @ts-ignore
        o[key] = true
    }
    return o;
};

const settingNamesMap = getMapOfAllSettingNames();
const settingNamesList = getAllSettingNames();

interface UserSetting {
    [key: string]: { visible: boolean, width: string };
}
interface UserSettings {
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
    Object.values(model).forEach((job: Property) => {
         // @ts-ignore
        newSettings.settings[job.field] = { visible: job.visible, width: job.width };
        // @ts-ignore
        newSettings.order.push(job.field);
     });
    return newSettings;
};

export const JobProperties = {
    '2.0.3': [
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
    '2.0.4': [
        "decisionIndex",
        "remainder",
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
        "ecpm",
        "price",
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