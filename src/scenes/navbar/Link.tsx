import { SelectedPage } from "@/shared/types";
import { useTranslation } from "react-i18next";
import { ReactNode } from "react";
import AnchorLink from "react-anchor-link-smooth-scroll";

type Props = {
    page: string;
    selectedPage: SelectedPage;
    setSelectedPage: (value: SelectedPage) => void;
    children?: ReactNode;
};

const Link = ({ page, selectedPage, setSelectedPage, children }: Props) => {
    const lowerCasePage = page.toLowerCase().replace(/ /g, "") as SelectedPage;
    const { t } = useTranslation();

    return (
        <AnchorLink
            href={`#${lowerCasePage}`}
            className={`${selectedPage === lowerCasePage ? "text-primary-500" : ""}
                transition duration-500 hover:text-primary-300 cursor-pointer`}
            onClick={() => setSelectedPage(lowerCasePage)}
        >
            {children ? children : t(`${page}`)}
        </AnchorLink>
    );
};

export default Link;
