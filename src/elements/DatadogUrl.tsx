import * as React from "react";

// @ts-ignore
export const DatadogUrl = ({ searchId, fromTs, toTs }) => {
    // old url = `https://app.datadoghq.com/logs?query=env%3Aprod-ams%20service%3A%28adtech-sponsored-listings%20OR%20adtech-targeting-strategy%29%20domain%3Aadtech%20%22requested%22%22${searchId}%22&cols=core_host%2Ccore_service&index=&integration_id=&integration_short_name=&messageDisplay=inline&saved_view=319551&stream_sort=desc&viz=stream&from_ts=${fromTs}&to_ts=${toTs}&live=true`;
    // new url verified =  'https://app.datadoghq.com/logs?query=env%3Aprod-ams%20service%3A%28adtech-sponsored-listings%20OR%20adtech-targeting-strategy%29%20domain%3Aadtech%20%20%40seeker.searchId%3Aa97d9e92-0ebd-4b1f-a747-762c639a6d45&cols=core_host%2Ccore_service&index=&integration_id=&integration_short_name=&messageDisplay=inline&saved_view=319551&stream_sort=desc&viz=stream&from_ts=1636065765465&to_ts=1636066665465&live=true'
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