import { ISvg } from "@interfaces";
export const InfoIcon = (props: ISvg) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={props.size}
        height={props.size}
        viewBox="0 0 15 15"
    >
        <g id="c-info" transform="translate(0.5 0.5)">
            <circle
                id="Ellipse_116"
                data-name="Ellipse 116"
                cx="1"
                cy="1"
                r="1"
                transform="translate(6 3.25)"
                fill="#646464"
            />
            <circle
                id="Ellipse_117"
                data-name="Ellipse 117"
                cx="7"
                cy="7"
                r="7"
                fill="none"
                stroke="#646464"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeMiterlimit="10"
                strokeWidth="1"
            />
            <line
                id="Line_305"
                data-name="Line 305"
                y1="4"
                transform="translate(7 6.75)"
                fill="none"
                stroke="#646464"
                strokeLinecap="square"
                strokeLinejoin="round"
                strokeMiterlimit="10"
                strokeWidth="1"
            />
        </g>
    </svg>
);
