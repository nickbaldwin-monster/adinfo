import * as React from "react";
import { DatadogUrl } from "../elements/DatadogUrl";
import { DecisionId } from "../elements/DecisionId";
import { AuctionBids } from "../elements/AuctionBids";
import {Button} from "@progress/kendo-react-buttons";




// @ts-ignore
export const DevInfo = ({ searchId, decisionId }) => {
    let toTs = Date.now();
    let fromTs = toTs - 900000;
    const url = `https://app.datadoghq.com/logs?query=env%3Aprod-ams%20service%3A%28adtech-sponsored-listings%20OR%20adtech-targeting-strategy%29%20domain%3Aadtech%20%22requested%22%22${searchId}%22&cols=core_host%2Ccore_service&index=&integration_id=&integration_short_name=&messageDisplay=inline&saved_view=319551&stream_sort=desc&viz=stream&from_ts=${fromTs}&to_ts=${toTs}&live=true`;

    const copyDecisionId = async () => {
        try {
            await navigator.clipboard.writeText(decisionId);
        }
        catch (err) {
            console.error('copy failed: ', err);
        }
    }

    return (
        <div style={{display: "flex", gap: "8px"}}>
            {decisionId &&
                <a href={url} target="_blank">
                    <Button
                        title="Datadog"
                        className="k-button "
                    >
                        Open in Datadog
                    </Button>
                </a>
            }

            {decisionId &&
                <Button
                    title="Datadog f"
                    className="k-button "
                    onClick={copyDecisionId}
                >
                    Copy decision id
                </Button>
            }
        </div>
    );
};