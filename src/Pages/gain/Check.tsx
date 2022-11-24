interface Iprops {
    color?: string;
    size?: number;
}
export const Check = (props: Iprops) => (
    <svg
        width={props.size || "71"}
        height={props.size || "71"}
        viewBox="0 0 71 71"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M35.5 71C55.1061 71 71 55.1061 71 35.5C71 15.8939 55.1061 0 35.5 0C15.8939 0 0 15.8939 0 35.5C0 55.1061 15.8939 71 35.5 71ZM29.1607 53.1284L57.3545 24.9346L52.4048 19.9849L29.1607 43.2289L18.5953 32.6634L13.6455 37.6132L29.1607 53.1284Z"
            fill={props.color || "white"}
            fillOpacity="0.64"
        />
    </svg>
);
