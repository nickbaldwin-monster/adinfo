import { MessageType } from "../types/types";
import { logger } from "./logger";

let log = logger('');

export const subscribeToExtensionMessages = (handler: (message: MessageType) => void)  => {
    chrome.runtime.onMessage.addListener(handler);
}

export const subscribeToWindowMessages = (eventHandler: (event: MessageEvent<MessageType>) => void)  => {
    window.addEventListener('message', eventHandler);
}





export const sendMessageToBackgroundAndPopup = (message: MessageType) => {
    chrome.runtime.sendMessage(message);
    log({
        logType: 'MESSAGE_SENT',
        payload: message,
        message: 'sent to background | popup'
    });
};

export const sendMessageToContent = (message: MessageType) => {
    // todo - check this approach
    // check url match - might need to provide array of diff monster domains
    // add monsterboard
    // add query e.g. {url: '*://*.monster.co.uk/*'}

    chrome.tabs.query({ active: true }, function(tabs){
        tabs.forEach((tab) => {
            if (tab.id) {
                chrome.tabs.sendMessage(tab.id, message);
            }
        });
    });

    log({
        logType: 'MESSAGE_SENT',
        payload: message,
        message: 'sent to content'
    });
};