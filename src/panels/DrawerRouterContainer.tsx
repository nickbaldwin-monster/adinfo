import * as React from "react";
import { withRouter } from "react-router-dom";
import { Drawer, DrawerContent } from "@progress/kendo-react-layout";
import { Button } from "@progress/kendo-react-buttons";
const items = [
    {
        text: "Inbox",
        icon: "k-i-inbox",
        selected: true,
        route: "/",
    },
    {
        separator: true,
    },
    {
        text: "Notifications",
        icon: "k-i-bell",
        route: "/notifications",
    }
];

const DrawerRouterContainer = (props: any) => {
    const [expanded, setExpanded] = React.useState(true);

    const handleClick = () => {
        setExpanded(!expanded);
    };

    const onSelect = (e: any) => {
        props.history.push(e.itemTarget.props.route);
        setExpanded(!expanded);
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
            <div className="custom-toolbar">
                <Button icon="menu" look="flat" onClick={handleClick} />
                <span className="mail-box">Mail Box</span>
            </div>
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