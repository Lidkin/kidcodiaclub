import React from "react";
import AnchorLink from "react-anchor-link-smooth-scroll";
import { SelectedPage } from "./types";
import { getAnalytics, logEvent } from "firebase/analytics";

type Props = {
    buttonName?: string,
    children: React.ReactNode;
    selectedPage?: string;
    setSelectedPage: (value: SelectedPage) => void;
}

const ActionButton = ({ buttonName, children, setSelectedPage, selectedPage }: Props) => {
    const bgColor = selectedPage === "classes" ? `bg-secondary-50 text-gray-500 font-bold z-10` : `bg-primary-500 text-white z-10`;

    const handleClick = () => {
        const analytics = getAnalytics();
        logEvent(analytics, 'button_click', {
            button_name: buttonName
        });
        buttonName === "classes" ? setSelectedPage(SelectedPage.Classes) : setSelectedPage(SelectedPage.Enroll);
    }

    return (
        <AnchorLink
            className={`rounded-md ${bgColor} px-10 py-2 hover:bg-secondary-500 hover:text-primary-500`}
            onClick={() => handleClick()}
            href={`#${buttonName}`}
        >
            {children}
        </AnchorLink>
    )
}

export default ActionButton