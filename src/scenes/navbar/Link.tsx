import { SelectedPage } from "@/shared/types";
import AnchorLink from "react-anchor-link-smooth-scroll";
import { useTranslation } from "react-i18next";

type Props = {
    page: string;
    selectedPage: SelectedPage;
    setSelectedPage: (value: SelectedPage) => void;
};

const Link = ({ page, selectedPage, setSelectedPage }: Props) => {
    const lowerCasePage = page.toLowerCase().replace(/ /g, "") as SelectedPage;
    const { t } = useTranslation();
    return (
        <AnchorLink
            className={`${selectedPage === lowerCasePage ? "text-primary-500" : ""}
        transition duration-500 hover:text-primary-300
      `}
            href={`#${lowerCasePage}`}
            onClick={() => setSelectedPage(lowerCasePage)}
        >
            {t(`${page}`)}
        </AnchorLink>
    );
};

export default Link;