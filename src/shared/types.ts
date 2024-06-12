
export enum SelectedPage { 
    Home = "home",
    Offerings ="offerings",
    Classes = "classes",
    Enroll = "enroll",
    Location = "location",
}

export enum QueryWidth {
    MinWidth = "(min-width:950px)",
}

export interface OfferingType{ 
    icon: JSX.Element;
    title: string;
    description: string;
}

export interface ClassType {
    name: string;
    age: string;
    image: string;
    description?: string;
    gif?: string;
}

export interface FooterType { 
    title: string;
    href: string;
}