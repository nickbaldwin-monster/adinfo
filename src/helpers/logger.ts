const app = '%c adinfo';
const style = 'background: #444; color: #fff; font-weight: bold; padding-top: 3px; padding-bottom: 3px;';


const isLog = true;

interface Log {
    moduleName?: string,
    message?: string,
    logType: string,
    functionName?: string,
    payload?: object,
    error?: string
}


export const logFactory = () => {
    console.log('log function called');
    let name = 'unknown';
    let fn = 'unknown';

    let imp = (message: string, functionName: string) => {
        console.log(`${ functionName }::: ${ message }`);
    }
    //
    let youFunction = function (...args: any[]) {
        // @ts-ignore
        return imp(...args);
    };
    // @ts-ignore
    youFunction.init =  (moduleName: string) => {
        name = moduleName;
        imp = (message: string, functionName: string) => {
            console.log(`${moduleName}: ${functionName}::: ${message}`);
        }
    };
    return youFunction;
}

export const logger = (moduleName: string) => {

    return ({ logType, functionName, message, payload, error }: Log) => {

        if (!isLog) {
            return;
        }
        log({ moduleName, functionName, logType, message, payload, error });
    };
}

export const log = ({ moduleName, functionName, logType, message, payload, error }: Log) => {

    let msg = app + " ::: " + logType.toLowerCase() + " ";

    if (!moduleName) {
        moduleName = "unknown" ;
    }
    if (!functionName) {
        functionName = "unknown";
    }
    if (logType === 'LOADED') {
        console.log(msg, style, { logType, moduleName });
    }
    if (logType === 'FUNCTION') {
        console.log(msg, style, { logType, moduleName, functionName, message });
    }
    if (logType === 'MESSAGE_RECEIVED') {
        console.log(msg, style, { logType, moduleName, functionName, payload });
    }
    if (logType === 'MESSAGE_SENT') {
        console.log(msg, style, { logType, moduleName, functionName, payload });
    }
    if (logType === 'ERROR') {
        console.log(msg, style, { logType, moduleName, functionName, payload, error });
    }
    if (logType === 'INFO') {
        console.log(msg, style, { logType, moduleName, functionName, payload, message });
    }
};
