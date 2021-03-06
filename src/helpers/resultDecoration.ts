import { DisplayJob } from "../types/DisplayJob";

import './resultDecoration.css';

export const resultDecoration = (job: DisplayJob, i: number): HTMLDivElement => {
    let container = document.createElement("div");
    let adProvider = job.adProvider || '';
    // @ts-ignore
    container.innerHTML = `
            <div class="resultRow alignRight">
            <div class="resultText">${adProvider} </div>
            <div class="resultSpacer" >&nbsp;</div>
            <div class="resultPosition">${i}</div>
            </div>
        `;
    container.setAttribute('class', 'resultDecoration');
    if (adProvider === '') {
        container.setAttribute('style', 'background-color: transparent');
    }

    else if (adProvider !== 'GCTS_ADQUERY') {
        container.setAttribute('style', 'background-color: color: #ff9999;');
    }
    return container;
};