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
                <GridColumn field="position" />
                <GridColumn field="company" />
                <GridColumn field="title" />
                <GridColumn field="location" />
                <GridColumn field="ingestion" />
                <GridColumn field="type" />
                <GridColumn field="adProvider" />
                <GridColumn field="mesco" />
            </Grid>
        </div>
    );
};


