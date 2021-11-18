import * as React from "react";
import { withRouter } from "react-router-dom";

import { Drawer, DrawerContent } from "@progress/kendo-react-layout";

import { useReduxContext } from "../context/Context";
import { LoginPanel } from "../panels/LoginPanel";
import { sendMessageToBackgroundAndPopup } from "../helpers/messaging";

const items = [
    {
        text: "Jobs",
        icon: "k-i-table",
        selected: true,
        route: "/",
    },
    {
        separator: true,
    },
    {
        text: "Errors",
        icon: "k-i-exception",
        route: "/errors",
    },
    {
        separator: true,
    },
    {
        text: "Settings",
        icon: "k-i-gear",
        route: "/settings",
    },
    {
        separator: true,
    },
    {
        text: "Feedback",
        icon: "k-i-track-changes-enable",
        route: "/feedback",
    },
    {
        separator: true,
    },
    {
        text: "Info",
        icon: "k-i-info",
        route: "/info",
    },
    {
        separator: true,
    },
    {
        text: "Display",
        icon: "k-i-preview",
        route: "/display",
    },
    {
        separator: true,
    }
];



const PluginWindow = (props: any) => {

    // @ts-ignore
    const { auth, display, toggleDisplay, showDisplay } = useReduxContext();
    // not expanding the toolbar
    const expanded = false;

    const onSelect = (e: any) => {
        if (e.itemTarget.props.route === '/display') {
            toggleDisplay();
        }
        else if (auth) {
            props.history.push(e.itemTarget.props.route);
            // if click on any icon, display
            showDisplay();
        }
        else {
            return;
        }
    };

    // @ts-ignore
    const setSelectedItem = (pathName: any) => {
        let currentPath = items.find((item) => item.route === pathName);
        // @ts-ignore
        if (currentPath.text) {
            // @ts-ignore
            return currentPath.text;
        }
    };
    let selected = setSelectedItem(props.location.pathname);

    // todo  - WIP
    sendMessageToBackgroundAndPopup({ type: 'AUTH_STATUS_REQUEST', source: 'plugin' });

    return (
        <div>
            <Drawer
                expanded={expanded}
                position={"end"}
                mode={"overlay"}
                mini={true}
                items={items.map((item) => ({
                    ...item,
                    title: item.text,
                    selected: item.text === selected,
                }))}
                onSelect={onSelect}
            >
                {display && <DrawerContent>
                    {!auth && <LoginPanel />}
                    {auth && props.children}
                </DrawerContent>}
            </Drawer>
        </div>
    );
};

export default withRouter(PluginWindow);