import * as React from 'react'
import { createPortal } from 'react-dom'

// @ts-ignore
export const IframeOriginal = ({ // @ts-ignore
                           children, ...props }) => {
    const [contentRef, setContentRef] = React.useState(null)

    let mountNode: any;
    // @ts-ignore
    mountNode = contentRef?.contentWindow?.document?.body;

    function handle (e: { storageArea: Storage; }) {
        if (e.storageArea === sessionStorage) {
            //
        }
        if (e.storageArea === localStorage) {
            //
        }
    }

    return (
        <iframe {...props}
            // sandbox="allow-same-origin allow-scripts"
            id='frame'
            name='frame'
            width='100px'
            height='100px'
            frameBorder='0'
            // @ts-ignore
            ref={setContentRef}>
            {mountNode && createPortal(children, mountNode)}
        </iframe>

    );

}