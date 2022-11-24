import { ILayout } from "@interfaces";

export const LayoutDefault = (props: ILayout) => {
    return <>{props.children}</>;
};
