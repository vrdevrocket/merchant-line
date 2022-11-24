import { CSSProperties } from "styled-components";

interface IProps {
    style: CSSProperties | undefined;
}

export const IConDown = (props: IProps) => {
    const { style } = props;
    return (
        <>
            <svg
                width="13"
                height="13"
                viewBox="0 0 13 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={style}
            >
                <path
                    d="M10.5 6L6.5 10L2.5 6"
                    stroke="#646464"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M6.5 10V1"
                    stroke="#646464"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M12 12H1"
                    stroke="#646464"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        </>
    );
};
