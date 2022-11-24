interface IProps {
    iconHeight?: string;
    iconWidth?: string;
}
export const MemberStar = (props: IProps) => {
    const { iconHeight, iconWidth } = props;
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={iconHeight || "22.361"}
            height={iconWidth || "21.325"}
            viewBox="0 0 22.361 21.325"
        >
            <path
                id="Path_11955"
                data-name="Path 11955"
                d="M21.563,7.707l-6.6-.958L12.015.771a.971.971,0,0,0-1.677,0L7.394,6.749.8,7.707A.932.932,0,0,0,.282,9.3l4.774,4.659-1.129,6.57a.932.932,0,0,0,1.353.982l5.9-3.108,5.9,3.1a.909.909,0,0,0,.432.106.932.932,0,0,0,.921-1.088l-1.129-6.57L22.08,9.291A.932.932,0,0,0,21.563,7.7Z"
                transform="translate(0 -0.29)"
                fill="#fff"
            />
        </svg>
    );
};
