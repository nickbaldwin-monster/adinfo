import * as React from "react";

// @ts-ignore
export const DatadogUrl = ({ searchId, fromTs, toTs }) => {
    const url = `https://app.datadoghq.com/logs?query=env%3Aprod-ams%20service%3A%28adtech-sponsored-listings%20OR%20adtech-targeting-strategy%29%20domain%3Aadtech%20%22requested%22%22${searchId}%22&cols=core_host%2Ccore_service&index=&integration_id=&integration_short_name=&messageDisplay=inline&saved_view=319551&stream_sort=desc&viz=stream&from_ts=${fromTs}&to_ts=${toTs}&live=true`;
    return (
        <a href={url} target='_blank' style={{ color: '#007bff' }}>
            Datadog
        </a>
    );
};