import * as React from "react";

// @ts-ignore
export const DatadogUrl = ({ searchId, fromTs, toTs }) => {
    return `https://app.datadoghq.com/logs?query=env%3Aprod-ams%20service%3A%28adtech-sponsored-listings%20OR%20adtech-targeting-strategy%29%20domain%3Aadtech%20%20%40seeker.searchId%3A${searchId}&cols=core_host%2Ccore_service&index=&integration_id=&integration_short_name=&messageDisplay=inline&saved_view=319551&stream_sort=desc&viz=stream&from_ts=${fromTs}&to_ts=${toTs}&live=true`;
};

// @ts-ignore
export const DatadogLinkWrapper = ({ searchId, children }) => {
    let toTs = Date.now();
    let fromTs = toTs - 3600000; // from 60m ago

    const url = DatadogUrl({ searchId, fromTs, toTs })
    return (
        <a href={url} target='_blank' style={{ color: '#007bff' }}>
            {children}
        </a>
    );
};