import * as React from 'react'



interface Props {
    content: any
}

const app = '%c adinfo';
const style = 'background: #444; color: #fff; font-weight: bold; padding-top: 3px; padding-bottom: 3px;';

const code = `
    <body>
        <script>
        
            const moduleName = 'IFRAME';
            
            const app = '%c adinfo';
            const style = 'background: #444; color: #fff; font-weight: bold; padding-top: 3px; padding-bottom: 3px;';

            
            const log = ({ moduleName, functionName, logType, message, payload, error }) => {
               
                let msg = app + " ::: " + logType.toLowerCase() + " ";
                
                if (logType === 'LOADED') {
                    console.log(msg, style, { logType, moduleName });
                }
                if (logType === 'FUNCTION') {
                    console.log(msg, style, { logType, moduleName, functionName, message });
                }
                if (logType === 'MESSAGE_RECEIVED') {
                    console.log(msg, style, { logType, moduleName, functionName, payload });
                }
                if (logType === 'MESSAGE_SENT') {
                    console.log(msg, style, { logType, moduleName, functionName, payload });
                }
                if (logType === 'ERROR') {
                    console.log(msg, style, { logType, moduleName, functionName, payload, error });
                }
                if (logType === 'INFO') {
                    console.log(msg, style, { logType, moduleName, functionName, payload, message });
                }
            };
            
            
            log({ logType: 'LOADED', moduleName });
                
            
            // send message when state changes
            window.addEventListener('storage', function(e) {
                if (e.key === 'savedReduxState') {
                    let message= "job state changed: " + e.key;
                     log({ logType: 'INFO', message });
                    window.parent.postMessage({ type: 'JOB_STATE', payload: e.newValue }, "*"); 
                }
            });
            
        </script>
        I am not visible!
    </body>
`;

export const Iframe = (props: Props) => {
    let iframe_ref = null;
    const writeHTML = (frame: any) => {
        iframe_ref = frame;
        let doc = frame.contentDocument;

        let msg = app + " ::: " + 'info' + " ";

        console.log(msg, style, {
            logType: 'INFO',
            payload: { frame: frame, doc: doc }
        });

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