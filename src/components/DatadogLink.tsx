import * as React from "react";
import { DatadogUrl } from "../elements/DatadogUrl";

// @ts-ignore
export const DatadogLink = ({ searchId }) => {
    let toTs = Date.now();
    let fromTs = toTs - 900000; // from 15m ago
    return (
        <section>
            <p>
                Open search id in&nbsp;
                <strong>
                    <DatadogUrl searchId={searchId} fromTs={fromTs} toTs={toTs} />
                </strong>
            </p>
        </section>
    );
};