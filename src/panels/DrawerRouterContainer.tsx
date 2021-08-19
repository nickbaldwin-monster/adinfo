import * as React from "react";
import { withRouter } from "react-router-dom";
import { Drawer, DrawerContent } from "@progress/kendo-react-layout";
import { useReduxContext } from "../context/Context";
import { logger } from "../helpers/logger";



const moduleName = 'DrawerRouterContainer';
let log = logger(moduleName);
log({ logType: 'LOADED' });



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
        icon: "k-i-error",
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
        icon: "k-i-css",
        route: "/feedback",
    },
    {
        separator: true,
    },
    {
        text: "Request",
        icon: "k-i-list-unordered",
        route: "/request",
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
    },
];

const DrawerRouterContainer = (props: any) => {


    // @ts-ignore
    const { display, setDisplay } = useReduxContext();


    const [expanded, setExpanded] = React.useState(false);

    const handleClick = () => {
        setExpanded(!expanded);
    };

    // todo
    const onSelect = (e: any) => {

        // todo - keep? or icon at bottom of toolbar
        if (e.itemTarget.props.route === '/display') {
            setDisplay(!display);
            return;
        }

        props.history.push(e.itemTarget.props.route);
        // setExpanded(!expanded);

        // todo - keep? if click on any icon, display
        setDisplay(true);
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

    let show = () => {
        setDisplay(!display);
    }

    let selected = setSelectedItem(props.location.pathname);
    // @ts-ignore

    // todo - could add an additional ite


    return (
        <div>

            <Drawer
                expanded={expanded}
                position={"end"}
                mode={"overlay"}
                mini={true}
                items={items.map((item) => ({
                    ...item,
                    selected: item.text === selected,
                }))}
                onSelect={onSelect}
            >

                {display &&
                    <DrawerContent>{props.children}</DrawerContent>
                }
            </Drawer>
        </div>
    );
};

export default withRouter(DrawerRouterContainer);