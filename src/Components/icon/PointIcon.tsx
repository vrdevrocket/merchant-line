interface IProps {
    color?: string;
    size?: number;
    onClick?: () => void;
}
const defaultColor = "black";
const defaultSize = "27";
export const PointIcon = (props: IProps) => {
    const { size, onClick } = props;
    return (
        <>
            <svg
                width={size || defaultSize}
                height={size || defaultSize}
                viewBox="-2 0 27 26"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                onClick={onClick}
            >
                <ellipse
                    id="Ellipse_135"
                    data-name="Ellipse 135"
                    cx="9"
                    cy="4"
                    rx="9"
                    ry="4"
                    transform="translate(2.5 1.5)"
                    fill="none"
                    stroke={defaultColor}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2.5"
                />
                <path
                    id="Path_11959"
                    data-name="Path 11959"
                    d="M2.5,6.5v.789c0,2.178,3.883,3.943,8.674,3.943s8.674-1.765,8.674-3.943V6.5"
                    transform="translate(0 4.622)"
                    fill="none"
                    stroke={defaultColor}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2.5"
                />
                <path
                    id="Path_11960"
                    data-name="Path 11960"
                    d="M2.5,9.5v.789c0,2.178,3.883,3.943,8.674,3.943s8.674-1.765,8.674-3.943V9.5"
                    transform="translate(0 7.395)"
                    fill="none"
                    stroke={defaultColor}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2.5"
                />
            </svg>
        </>
    );
};
