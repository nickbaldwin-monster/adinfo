import * as React from "react";

import { DatadogLinkWrapper } from "../elements/DatadogUrl";



// @ts-ignore
export const DatadogLink = ({ searchId }) => {

    return (
        <section>
            <p>
                Open search id in&nbsp;
                <strong>
                    <DatadogLinkWrapper searchId={searchId} >
                        Datadog
                    </DatadogLinkWrapper>
                </strong>
            </p>
        </section>
    );
};