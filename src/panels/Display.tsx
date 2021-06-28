import * as React from "react";

import '@progress/kendo-theme-default/dist/all.css';
import { process } from '@progress/kendo-data-query';
import { Grid, GridColumn } from '@progress/kendo-react-grid';


// import "./Settings.css";
import { loadSettings, saveSettings } from "../helpers/state";

let products = [
    {"ProductID": 1, "ProductName": "Tea", "CategoryID": 1, "QuantityPerUnit": "10 boxes x 20 bags", "UnitPrice": 18.0, "UnitsInStock": 39, "Discontinued": false },
    {"ProductID": 7, "ProductName": "Dried Pears", "CategoryID": 7, "QuantityPerUnit": "12 - 1 lb pkgs.", "UnitPrice": 30.0, "UnitsInStock": 15, "Discontinued": false },
    {"ProductID": 8, "ProductName": "Cranberry Sauce", "CategoryID": 2, "QuantityPerUnit": "12 - 12 oz jars", "UnitPrice": 40.0, "UnitsInStock": 6, "Discontinued": false },
    {"ProductID": 9, "ProductName": "Mishi Kobe Niku", "CategoryID": 6, "QuantityPerUnit": "18 - 500 g pkgs.", "UnitPrice": 97.0, "UnitsInStock": 29, "Discontinued": true },
    {"ProductID": 14, "ProductName": "Tofu", "CategoryID": 7, "QuantityPerUnit": "40 - 100 g pkgs.", "UnitPrice": 23.25, "UnitsInStock": 35, "Discontinued": false },
    {"ProductID": 17, "ProductName": "Alice Mutton", "CategoryID": 6, "QuantityPerUnit": "20 - 1 kg tins", "UnitPrice": 39.0, "UnitsInStock": 0, "Discontinued": false},
];

export const Display = () => {
    return (
        <div>
            <p>hello</p>
            <Grid
                data={products}>
                <GridColumn field="ProductName" />
                <GridColumn field="UnitPrice" />
                <GridColumn field="UnitsInStock" />
                <GridColumn field="Discontinued" />
            </Grid>
        </div>
    );
};


