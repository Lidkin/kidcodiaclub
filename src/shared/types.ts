export enum SelectedPage { 
    Home = "home",
    About ="about",
    Scratch = "scratch",
    Python = "python",
    Register = "register",
}

export enum QueryWidth {
    MinWidth = "(min-width:900px)",
}

export interface AboutType{ 
    icon: JSX.Element;
    title: string;
    description: string;
}