import * as React from "react";
import { DatadogUrl } from "../elements/DatadogUrl";
import { DecisionId } from "../elements/DecisionId";
import { AuctionBids } from "../elements/AuctionBids";
import {Button} from "@progress/kendo-react-buttons";

// @ts-ignore
export const DevInfo = ({ searchId, decisionId }) => {
    let toTs = Date.now();
    let fromTs = toTs - 900000;
    return (
        <div style={{display: "flex", gap: "8px"}}>
            <a href="">{searchId && <Button
                title="Datadog"
                className="k-button "
            >
                Open in Datadog
            </Button>}</a>

            {decisionId && <Button
                title="Datadog f"
                className="k-button "
                look="outline"
            >
                Copy decision id
            </Button>}
        </div>
    );
};