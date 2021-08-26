import { DisplayJob } from "../types/DisplayJob";
import { resultDecoration } from './resultDecoration';
import {logComponent} from "./reactHelper";




export const decorateResults = (jobs: DisplayJob[]) => {



    const dec = () => {
        const resultLists = document.querySelectorAll("[class^='job-cardstyle__JobCardComponent-']");
        const elements = Array.from(resultLists);

        elements.forEach((el: Element, i) => {
            let container = resultDecoration(jobs[i], i);
            el.children[0].appendChild(container);
        });
    }


    // todo - this is now hacky - getting jobs from setJobs
    // todo - may not need to redecorate prev elements
    // todo - may need to compare state v results - if timing issues
    let resultLists = document.querySelectorAll('.results-list');

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
    }


    else {
        resultLists = document.querySelectorAll("[class^='job-cardstyle__JobCardComponent-']");

        // todo - replace with poller?
        if (!resultLists || resultLists.length === 0) {
            setTimeout(() => {
                dec();
            }, 500);
        } else {
            dec();
        }
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