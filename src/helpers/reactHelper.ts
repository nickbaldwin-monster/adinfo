

// @ts-ignore
const findReactComponent = function(el) {
    for (const key in el) {
        if (key.startsWith('__reactInternalInstance$')) {
            const fiberNode = el[key];

            return fiberNode && fiberNode.return && fiberNode.return.stateNode;
        }
    }
    return null;
};


export const logComponent = (el: any) => {

    let something = findReactComponent(el);
    console.log('!!!!!!!');
    console.log('!!!!!!!');

    console.log(something);

    console.log('!!!!!!!');
    console.log('!!!!!!!');


}