import { SearchContext } from "../types/SearchContext";

const flatten = (obj: Object) => {
    let res = {};
    for (const [key, value] of Object.entries(obj)) {
        if (typeof value === 'object') {
            res = { ...res, ...flatten(value) };
        } else {
            // @ts-ignore
            res[key] = value;
        }
    }
    return res;
}

interface ContextItem {
    [key: string]: [value: string];
}

export const flattenToArray = (obj: Object) => {
    let res: Array<object> = [];
    for (const [key, value] of Object.entries(obj)) {
        if (key === 'distributor') {
            // ignore
        }
        else if (typeof value === 'object') {
            res = [ ...res, ...flattenToArray(value) ];
        }
        else {
            if (typeof value === 'number') {
                // @ts-ignore
                res.push({key: key, value: "" + value});
            }
            else {
                res.push({key: key, value: value});
            }
        }
    }
    return res;
}

export const transformSearchContext = (searchContext: SearchContext) => {
    return flattenToArray(searchContext);
}