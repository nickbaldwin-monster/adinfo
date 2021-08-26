import { DisplayJob } from "../types/DisplayJob";
import { resultDecoration } from './resultDecoration';
import {logComponent} from "./reactHelper";




export const decorateResults = (jobs: DisplayJob[]) => {


    // todo - this is now hacky - getting jobs from setJobs



    let resultLists = document.querySelectorAll('.results-list');

    // for old views
    if (resultLists && resultLists.length) {
        const splitElements: Element[] = Array.from(resultLists[0].children);
        const mobileElements: Element[] = Array.from(resultLists[1].children);
        const elements = [...splitElements, ...mobileElements];

        splitElements.forEach((el: Element, i) => {
            if (el.children[0].children.length === 2) {
                let container = resultDecoration(jobs[i], i);
                el.children[0].appendChild(container);
            }
        });

        // for new views
    } else {
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
    }


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