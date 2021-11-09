import * as React from "react";


// @ts-ignore
export const Info = ({ numberResults, auctionBids, errors }) => {
    let isResults = numberResults !== undefined;
    return (
        <div style={{ display: "flex" }}>
            { auctionBids && <div>{auctionBids} bids.&nbsp;</div> }
            { isResults && <div>{numberResults} results.&nbsp;</div> }
            { errors && <div>{errors.number || 0}.&nbsp;</div> }
        </div>
    );
};