import React, { useState } from 'react';
import * as ReactDOM from "react-dom";



import { logger } from "../helpers/logger";
import {TabStrip, TabStripTab} from "@progress/kendo-react-layout";
import { Tab1 } from "../components/Tab1";


const moduleName = 'Tabs';
let log = logger(moduleName);
log({ logType: 'LOADED' });


export const Tabs = () => {

    const [selected, setSelected] = useState(0);

    const handleSelect = (e: any) => {
        setSelected(e.selected);
    };

    return (
        <div className='ad-tabs'>
    <TabStrip
        selected={selected}
        onSelect={handleSelect}
        tabPosition={'right'}
    >
        <TabStripTab title = 'B'>
            <Tab1 />
        </TabStripTab>
        <TabStripTab title = 'B'>
            <div>
                <p> tab content</p>
            </div>

        </TabStripTab>
    </TabStrip>
        </div>
    );
};