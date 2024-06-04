export enum SelectedPage { 
    Home = "home",
    Offerings ="offerings",
    Scratch = "scratch",
    Python = "python",
    Register = "register",
}

export enum QueryWidth {
    MinWidth = "(min-width:900px)",
}

export interface OfferingsType{ 
    icon: JSX.Element;
    title: string;
    description: string;
}