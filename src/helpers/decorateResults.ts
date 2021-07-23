export const decorateResults = (numberNewItems: number) => {

    // todo - may not need to redecorate prev elements
    let resultLists = document.querySelectorAll('.results-list');

    if (resultLists) {
        const splitElements: Element[] = Array.from(resultLists[0].children);
        const mobileElements: Element[] = Array.from(resultLists[1].children);
        const elements = [...splitElements, ...mobileElements];

        splitElements.forEach((el: Element, i) => {
            if (el.children[0].children.length === 2) {
                let container = document.createElement("div");
                container.innerText = '' + (i + 1);
                el.children[0].appendChild(container);
                container.setAttribute('class', 'result-decoration');
            }
        });
    }
};