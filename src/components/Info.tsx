import * as React from "react";


// @ts-ignore
 const AuctionBids = ({ auctionBids }) => {
     if (!auctionBids) {
         return null;
     }
    return (
        <div>
            {auctionBids} bids.&nbsp;
        </div>
    );
};
// @ts-ignore
const Results = ({ numberResults }) => {
    if (!numberResults) {
        return null;
    }
    return (
        <div>
            {numberResults} results.&nbsp;
        </div>
    );
};
// @ts-ignore
const Errors = ({ errors }) => {
    if (!errors) {
        return null;
    }
    return (
        <div>
            {errors}.&nbsp;
        </div>
    );
};


// @ts-ignore
export const Info = ({ numberResults, auctionBids, errors }) => {
    let isResults = numberResults !== undefined;
    return (
        <div style={{display: "flex"}}>
            { auctionBids && <AuctionBids auctionBids={auctionBids} /> }
            { isResults && <Results numberResults={numberResults} /> }
            { errors && <Errors errors={errors.message} /> }
        </div>
    );
};