import React from "react";
import AnchorLink from "react-anchor-link-smooth-scroll";
import { SelectedPage } from "./types";

type Props = {
    children: React.ReactNode;
    selectedPage?: string;
    setSelectedPage: (value: SelectedPage) => void;
}

const ActionButton = ({ children, setSelectedPage, selectedPage }: Props) => {
    const bgColor = selectedPage === "classes" ? `bg-secondary-50 text-gray-100 font-bold` : `bg-primary-500 text-white`;

  return (
      <AnchorLink
          className={`rounded-md ${bgColor} px-10 py-2 hover:bg-secondary-500 hover:text-primary-500`}
          onClick={() => setSelectedPage(SelectedPage.Enroll)}
            href={`#${SelectedPage.Enroll}`}
      >
          {children}
      </AnchorLink>
  )
}

export default ActionButton