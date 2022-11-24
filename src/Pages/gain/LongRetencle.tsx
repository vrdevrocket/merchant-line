interface Iprops {
    width?: number;
    color?: string;
}
export const LongRetencle = (props: Iprops) => (
    <svg
        width={props.width || "131"}
        height="10"
        viewBox="0 0 131 10"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <rect opacity="0.64" width="131" height="10" rx="5" fill={props.color || "white"} />
    </svg>
);
