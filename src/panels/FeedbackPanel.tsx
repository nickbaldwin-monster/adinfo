import React from 'react';

// todo - cut down css
import './Table.css';

import { Panel } from "./Panel";


export const FeedbackPanel = () => {
    let width = 330;
    let finalWidth = "" + (width - 10);

    // @ts-ignore
    return (
        <Panel>
            <div style={{overflowY: "auto"}}>
                <iframe
                    width={finalWidth}
                    height="640"
                    src="https://forms.office.com/Pages/ResponsePage.aspx?id=hfK3hV-qlEODFuxxFqqe9TuA2QK9G0hMhXAHa41cXqtUM0VHQzNHVEtZNVIwSjNDTDNIRFpPRjVDSy4u&embed=true"
                    frameBorder="0"
                    // @ts-ignore
                    marginWidth="0"
                    // @ts-ignore
                    marginHeight="0"
                    // @ts-ignore
                    // style="border: none; max-width:100%; max-height:100%"
                    id="adinfoFrame"
                >
                </iframe>
            </div>
        </Panel>
    );
};