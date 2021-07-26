export interface ErrorItem {
    message: string;
    jobPosition: number;
    detail: string;
}
export interface Errors {
    message: string;
    number: number;
    jobPositions: number[] | [];
    items: ErrorItem[] | [];
    isError: boolean
}

export type ErrorsKey = keyof Errors;
export type ErrorItemKey = keyof ErrorItem;

export const ErrorsSchema: Record<ErrorsKey, string> = {
    message: 'string',
    number: 'number',
    jobPositions: 'array',
    items: 'array',
    isError: 'boolean'
};

export const ErrorItemSchema: Record<ErrorItemKey, string> = {
    message: 'string',
    jobPosition: 'number',
    detail: 'string',
};



export const isErrorItem = (input: string): boolean => {
    if (input !== '' && input in ErrorItemSchema) {
        return true;
    }
    return false;
}

export const isErrors = (input: any): input is Errors => {
    if ( !input  || input === {}) {
        return false;
    }

    // todo -
    /*
    let errors = false;
    Object.values(input).forEach((value) => {

        let t = typeof value;
        if (!t || t!== ErrorsSchema[value]) {
            errors = true;
        }
    })
    if (errors) return false;

     */

    // todo - understand and update
    const missingProperties = Object.keys(ErrorsSchema)
        .filter(key => input[key] === undefined)
        .map(key => key as keyof Errors)
        .map(key => new Error(`Document is missing ${key} ${ErrorsSchema[key]}`));

    // throw error?

    return missingProperties.length === 0;
}

export const defaultErrors: Errors = {
    message: 'No errors',
    number: 0,
    jobPositions: [],
    items: [],
    isError: false
};


export const defaultErrorItem = {
    message: '',
    jobPosition: 0,
    detail: ''
};