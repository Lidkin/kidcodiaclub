export enum SelectedPage { 
    Home = "home",
    Offerings ="offerings",
    Classes = "classes",
    Enroll = "enroll",
}

export enum QueryWidth {
    MinWidth = "(min-width:900px)",
}

export interface OfferingType{ 
    icon: JSX.Element;
    title: string;
    description: string;
}

export interface ClassType { 
    name: string;
    image: string;
    description?: string;
    afterbg?: string;
}