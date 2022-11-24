import { ISvg } from "@interfaces";

export const IConContacts = (props: ISvg) => {
    return (
        <svg
            width={props.size}
            height={props.size}
            viewBox="0 0 19 18"
            fill={props.fill || "none"}
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M7.04805 7.936C6.31242 7.93573 5.60699 7.64339 5.08683 7.12322C4.56666 6.60305 4.27431 5.89763 4.27405 5.162V3.774C4.27431 3.03837 4.56666 2.33295 5.08683 1.81278C5.60699 1.29261 6.31242 1.00027 7.04805 1V1C7.78368 1.00027 8.4891 1.29261 9.00927 1.81278C9.52944 2.33295 9.82178 3.03837 9.82205 3.774V5.162C9.82178 5.89763 9.52944 6.60305 9.00927 7.12322C8.4891 7.64339 7.78368 7.93573 7.04805 7.936Z"
                stroke={props.color || "#F22F46"}
                strokeWidth={props.strokeWidth || 2}
                strokeMiterlimit="10"
                strokeLinecap="square"
            />
            <path
                d="M12.6 16.26H1.50002V13.411C1.49828 12.9884 1.62554 12.5752 1.8648 12.2268C2.10406 11.8784 2.44393 11.6112 2.83902 11.461C4.18559 10.959 5.61192 10.7049 7.04902 10.711C8.48611 10.7049 9.91245 10.959 11.259 11.461C11.6546 11.6108 11.9949 11.8778 12.2346 12.2262C12.4742 12.5747 12.6017 12.9881 12.6 13.411V16.26Z"
                stroke={props.color || "#F22F46"}
                strokeWidth={props.strokeWidth || 2}
                strokeMiterlimit="10"
                strokeLinecap="square"
            />
            <path
                d="M12.5 2.58691H17.5"
                stroke={props.color || "#F22F46"}
                strokeWidth={props.strokeWidth || 2}
                strokeMiterlimit="10"
                strokeLinecap="square"
            />
            <path
                d="M12.5 6.58691H17.5"
                stroke={props.color || "#F22F46"}
                strokeWidth={props.strokeWidth || 2}
                strokeMiterlimit="10"
                strokeLinecap="square"
            />
            <path
                d="M14.5 9.58691H17.5"
                stroke={props.color || "#F22F46"}
                strokeWidth={props.strokeWidth || 2}
                strokeMiterlimit="10"
                strokeLinecap="square"
            />
        </svg>
    );
};
