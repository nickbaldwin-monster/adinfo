import * as React from "react";

import '@progress/kendo-theme-default/dist/all.css';
import { process } from '@progress/kendo-data-query';
import { Grid, GridColumn } from '@progress/kendo-react-grid';


// import "./Settings.css";
import { loadSettings, saveSettings } from "../helpers/state";

let products = [
    {"position": 1, "company": "Suzuki", "title": "Driver", "location": "Colorado Springs, CO 80910", "ingestion": "JPW", "type": "2", "adProvider": "Adtech", "mesco": "4300746001001" },
    {"position": 2, "company": "Maaas", "title": "Receptionist", "location": "Colorado Springs, CO 80910", "ingestion": "NOW", "type": "2", "adProvider": "Adtech", "mesco": "4300746001001" },
    {"position": 3, "company": "Apple", "title": "Software engineer", "location": "Colorado Springs, CO 80910", "ingestion": "NOW", "type": "2", "adProvider": "Adtech", "mesco": "4300746001001" },
    {"position": 4, "company": "IBM", "title": "Software development manager", "location": "Colorado Springs, CO 80910", "ingestion": "NOW", "type": "2", "adProvider": "Adtech", "mesco": "4300746001001" },
    {"position": 5, "company": "Randstad", "title": "Sales manager", "location": "Colorado Springs, CO 80910", "ingestion": "JPW", "type": "2", "adProvider": "Adtech", "mesco": "4300746001001" },
    {"position": 6, "company": "Monster", "title": "Product owner", "location": "remote", "ingestion": "NOW", "type": "3", "adProvider": "Adtech", "mesco": "4300746001001"},
    {"position": 1, "company": "Suzuki", "title": "Driver", "location": "Colorado Springs, CO 80910", "ingestion": "JPW", "type": "2", "adProvider": "Adtech", "mesco": "4300746001001" },
    {"position": 2, "company": "Maaas", "title": "Receptionist", "location": "Colorado Springs, CO 80910", "ingestion": "NOW", "type": "2", "adProvider": "Adtech", "mesco": "4300746001001" },
    {"position": 3, "company": "Apple", "title": "Software engineer", "location": "Colorado Springs, CO 80910", "ingestion": "NOW", "type": "2", "adProvider": "Adtech", "mesco": "4300746001001" },
    {"position": 4, "company": "IBM", "title": "Software development manager", "location": "Colorado Springs, CO 80910", "ingestion": "NOW", "type": "2", "adProvider": "Adtech", "mesco": "4300746001001" },
    {"position": 5, "company": "Randstad", "title": "Sales manager", "location": "Colorado Springs, CO 80910", "ingestion": "JPW", "type": "2", "adProvider": "Adtech", "mesco": "4300746001001" },
    {"position": 6, "company": "Monster", "title": "Product owner", "location": "remote", "ingestion": "NOW", "type": "3", "adProvider": "Adtech", "mesco": "4300746001001"},
];

export const Display = () => {

    return (
        <div>
            <p>hello</p>
            <Grid
                data={products}>

                <GridColumn field="position" title="pos" />
                <GridColumn field="company" title="company" />
                <GridColumn field="title" title="title" />
                <GridColumn field="location" title="location" />
                <GridColumn field="ingestionMethod" title="ingestion" />
                <GridColumn field="pricingType" title="type" />
                <GridColumn field="adProvider" title="adProvider" />
                <GridColumn field="mesco" title="mesco" />
                <GridColumn field="dateRecency" title="recency" />
                <GridColumn field="formattedDate" title="date" />
                <GridColumn field="provider" title="provider" />
                <GridColumn field="applyType" title="apply" />



            </Grid>
        </div>
    );
};


