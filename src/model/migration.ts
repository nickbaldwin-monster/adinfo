type VersionRecord = Record<string, boolean>

const previousVersions: VersionRecord = {
    "2.0.0" : true,
    "2.0.1" : true,
    "2.0.2" : true,
    "2.0.3" : true,
    "2.0.4" : true,
    "2.0.5" : true,
    "2.1.0" : true,
    "2.2.0" : true,
}

export const needToMigrate = (version: string | undefined | null) => {
    if (!version) {
        return true;
    }
    else {
        return previousVersions[version] || false;
    }
}