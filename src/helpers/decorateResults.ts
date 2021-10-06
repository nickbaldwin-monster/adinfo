import { DisplayJob } from "../types/DisplayJob";
import { resultDecoration } from './resultDecoration';



export const decorateResults = (jobs: DisplayJob[]) => {
    let resultLists = document.querySelectorAll('.results-list');

    const poller = setInterval(() => {
        resultLists = document.querySelectorAll("[class^='job-cardstyle__JobCardComponent-']");
        if (resultLists.length !== 0) {
            clearInterval(poller);
            const elements = Array.from(resultLists);
            elements.forEach((el: Element, i) => {
                let container = resultDecoration(jobs[i], i);
                el.children[0].appendChild(container);
            });
        }
    }, 300);
};


export const removeDecorations = () => {
    let resultLists = document.querySelectorAll('.resultDecoration');
    if (resultLists) {
        resultLists.forEach((el: Element) => {
            let parent = el.parentElement;
            if (parent) {
                parent.removeChild(el);
            }
        });
    }
};