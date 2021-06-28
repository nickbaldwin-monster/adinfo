

export const subscribe = (moduleName: string) => {
    console.log(`${moduleName} subscribed`);
    chrome.runtime.onMessage.addListener((request) => {
        console.log(`Message received in ${moduleName}`, request);
    });
}