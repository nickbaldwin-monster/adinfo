import * as React from "react";

import { Button } from "@progress/kendo-react-buttons";

import { DatadogLinkWrapper } from "../elements/DatadogUrl";



// @ts-ignore
export const DevInfo = ({ searchId, decisionId }) => {

    const copyId = async (id: string) => {
        try {
            await navigator.clipboard.writeText(id);
        }
        catch (err) {
            console.error('copy failed: ', err);
        }
    }

    const copySearchId = () => copyId(searchId);
    const copyDecisionId = () => copyId(decisionId);

    return (
        <div style={{ display: "flex", gap: "8px" }}>
            {searchId && (
                <DatadogLinkWrapper searchId={searchId}>
                    <Button
                        title="Open in Datadog"
                        className="k-button "
                    >
                        Open in Datadog
                    </Button>
                </DatadogLinkWrapper>
            )}

            {decisionId && (
                <Button
                    title="Copy decision id"
                    className="k-button "
                    onClick={copyDecisionId}
                >
                    Copy decision id
                </Button>
            )}

            {searchId && (
                <Button
                    title="Copy search id"
                    className="k-button "
                    onClick={copySearchId}
                >
                    Copy search id
                </Button>
            )}
        </div>
    );
};