import { DisplayJob } from "../types/DisplayJob";
import { resultDecoration } from './resultDecoration';
import {logComponent} from "./reactHelper";



export const decorateResults = (jobs: DisplayJob[]) => {

    // todo - this is now hacky - getting jobs from setJobs
    // console.log('jobs in decorate: ', jobs);


    // todo - may not need to redecorate prev elements
    // todo - may need to compare state v results - if timing issues
    let resultLists = document.querySelectorAll('.results-list');

    if (resultLists) {

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