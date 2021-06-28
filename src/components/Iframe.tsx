import * as React from 'react'

interface Props {
    content: any
}

const code = `
    <body>
        <script>
        
            const moduleName = 'IFRAME';
        
            const log = ({ moduleName, functionName, logType, message, payload, error }) => {
               
                if (logType === 'LOADED') {
                    console.log(logType, { logType, moduleName });
                }
                if (logType === 'FUNCTION') {
                    console.log(logType, { logType, moduleName, functionName, message });
                }
                if (logType === 'MESSAGE_RECEIVED') {
                    console.log(logType, { logType, moduleName, functionName, payload });
                }
                if (logType === 'MESSAGE_SENT') {
                    console.log(logType, { logType, moduleName, functionName, payload });
                }
                if (logType === 'ERROR') {
                    console.log(logType, { logType, moduleName, functionName, payload, error });
                }
                if (logType === 'CUSTOM') {
                    console.log(logType, { logType, moduleName, functionName, payload, message });
                }
            };
            
            log({logType: 'LOADED', moduleName});
            
            

            window.addEventListener('storage', function(e) {

                if (e.key === 'savedReduxState') {
                    let message= "job state changed: " + e.key;
                    log({ logType: 'CUSTOM', message });
                    window.parent.postMessage({messageType: 'JOB_STATE', payload: e.newValue}, "*");
                    // todo
 
                }
            });
            
      
        </script>
        I am not visible
    </body>
`;

export const Iframe = (props: Props) => {
    let iframe_ref = null;
    const writeHTML = (frame: any) => {
        iframe_ref = frame;
        let doc = frame.contentDocument;
        console.log("frame, doc: ", frame, doc)
        doc.open();
        doc.write(code);
        doc.close();
    };

    return (
        // @ts-ignore
        <iframe
            src="about:blank"
            scrolling="no"
            frameBorder="0"
            width="20px"
            height="20px"
            ref={ writeHTML }
        />
    );
};

export const alternative = () => {
    return(<iframe
        dangerouslySetInnerHTML={{ __html: code}}
        src="about:blank"
        scrolling="no"
        frameBorder="0"
        width="20px"
        height="20px"
    />);
};


// usage
// import IframeOriginal from './IframeOriginal';
// <IframeOriginal content={<p>Hello world!</p>} />

// todo: try alternative