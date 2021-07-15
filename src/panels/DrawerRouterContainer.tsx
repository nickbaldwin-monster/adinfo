import * as React from "react";
import { withRouter } from "react-router-dom";
import { Drawer, DrawerContent } from "@progress/kendo-react-layout";
const items = [
    {
        text: "Jobs",
        icon: "k-i-inbox",
        selected: true,
        route: "/",
    },
    {
        separator: true,
    },
    {
        text: "Request",
        icon: "k-i-bell",
        route: "/request",
    },
    {
        separator: true,
    },
    {
        text: "Settings",
        icon: "k-i-gear",
        route: "/settings",
    }
];

const DrawerRouterContainer = (props: any) => {
    const [expanded, setExpanded] = React.useState(false);

    const handleClick = () => {
        setExpanded(!expanded);
    };

    // todo
    const onSelect = (e: any) => {
        props.history.push(e.itemTarget.props.route);
        // setExpanded(!expanded);
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
                <DrawerContent>{props.children}</DrawerContent>
            </Drawer>
        </div>
    );
};

export default withRouter(DrawerRouterContainer);