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
            <div class="resultPosition">${i + 1}</div>
            </div>
        `;
    container.setAttribute('class', 'resultDecoration');
    if (adProvider === '') {
        container.setAttribute('style', 'background-color: transparent');
    }
    else if (adProvider !== 'ADZERK') {
        container.setAttribute('style', 'background-color: red');
    }
    return container;
};