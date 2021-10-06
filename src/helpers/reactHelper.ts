

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
