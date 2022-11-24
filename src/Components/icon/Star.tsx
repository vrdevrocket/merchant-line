import { ISvg } from "@interfaces";

export const IconStar = (props: ISvg) => {
    return (
        <svg
            width={props.size}
            height={props.size}
            viewBox="0 0 18 17"
            fill={props.fill || "none"}
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M9 1.3999L11.318 6.0999L16.5 6.8529L12.75 10.5039L13.635 15.6659L9 13.2329L4.365 15.6659L5.25 10.5039L1.5 6.8489L6.682 6.0959L9 1.3999Z"
                stroke={props.color || "#F22F46"}
                strokeWidth={props.strokeWidth || 2}
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};
