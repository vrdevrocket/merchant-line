interface Iprops {
    color?: string;
}
export const ArrowRight = (props: Iprops) => {
    return (
        <svg width="5" height="7" viewBox="0 0 5 7" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M1.09204 0.955002L4.21904 3.691"
                stroke={props.color || "white"}
                strokeWidth="0.5"
                strokeMiterlimit="10"
            />
            <path
                d="M1.09204 0.955002L4.21904 3.691"
                stroke={props.color || "white"}
                strokeWidth="0.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M1.09204 6.42701L4.21904 3.69101"
                stroke={props.color || "white"}
                strokeWidth="0.5"
                strokeMiterlimit="10"
            />
            <path
                d="M1.09204 6.42701L4.21904 3.69101"
                stroke={props.color || "white"}
                strokeWidth="0.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};
